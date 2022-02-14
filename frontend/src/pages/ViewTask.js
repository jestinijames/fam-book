import React, { useEffect, useState } from 'react';

// Task Reducer actions
import { getTaskAction, reset, closeTaskAction } from '../store/tasks/taskSlice';
import { createNoteAction, getNotesAction, reset as notesReset } from '../store/notes/noteSlice';

// react-router
import { useParams, useNavigate } from 'react-router-dom';

// Reux dev tools
import { useDispatch, useSelector } from 'react-redux';

// React Icons
import { FaPlus } from 'react-icons/fa';

// Message toaster
import { toast } from 'react-toastify';


// Components
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';

// Modal
import Modal from 'react-modal';
const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}
Modal.setAppElement('#root');



const ViewTask = () => {

const [modalIsOpen, setModalIsOpen] = useState(false);
const [noteText, setNoteText] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();

const { taskId } = useParams(); 


const { task, isLoading, isSuccess, isError, message } =
useSelector((state) => state.taskReducer);


const { notes, isLoading: notesIsLoading , isError: notesIsError , message:notesMessage } =
useSelector((state) => state.noteReducer);



useEffect(() => {
 if(isError) {
     toast.error(message);
 }
 if(notesIsError) {
    toast.error(notesMessage);
}
 dispatch(getTaskAction(taskId));
 dispatch(getNotesAction(taskId));   
//  eslint-disable-next-line
},[isError, notesIsError, message, notesMessage, taskId])




// Close ticket
const onTicketClose = () => {
dispatch(closeTaskAction(taskId));
toast.success('Task Completed!!');
navigate('/tasks');
};


// modal stuff
const openModal = () => {
setModalIsOpen(true);
};
const closeModal = () => {
    setModalIsOpen(false);
    };
const onNoteSubmit = (e) => {
     e.preventDefault();
     const taskNote = {
        text: noteText,
        taskId
    };
    dispatch(createNoteAction(taskNote));
     closeModal();
};   


if(isLoading || notesIsLoading) {
    return <Spinner />
}

if(isError || notesIsError) {
    return <h3>Something went wrong</h3>
}
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
          <BackButton url='/tasks' />
          <h2>
              Task ID: {task._id}
              <span className={`status status-${task.status}`}></span>
          </h2>
          <h3>
             Date Created: {new Date(task.createdAt).toLocaleString('en-US')} 
          </h3>
          <h3>
              Type: {task.type}
          </h3>
          <hr />
          <div className='ticket-desc'>
              <h3>Description of Task</h3>
              <p>{task.description}</p>
          </div>
          {notes &&  <h2>Notes</h2>}
           </header>

           {task.status !== 'Done' && (<button onClick={openModal} className='btn'><FaPlus/>Add a note</button>) }
           <Modal 
           isOpen={modalIsOpen} 
           onRequestClose={closeModal} 
           style={customStyles}
           contentLabel='Add Note'
           >
               <h2>Add Note</h2>
               <button className='btn-close' onClick={closeModal}>X</button>
               <form onSubmit={onNoteSubmit}>
                   <div className='form-group'>
                       <textarea 
                       name='noteText'
                       id='noteText'
                       className='form-control'
                       placeholder='Your Note here'
                       value={noteText}
                       onChange={(e) => setNoteText(e.target.value)}
                       ></textarea>
                   </div>
                   <div className='form-group'>
                       <button 
                       className='btn'
                       type='submit'
                       >Submit</button>
                   </div>
               </form>
           </Modal>

           {
              notes && notes.map((note)=> {
                  return <NoteItem key={note._id} note={note} />
               })
           }
      {task.status !== 'Done' && (<button onClick={onTicketClose} className='btn btn-block btn-danger'>Mark as completed</button>) }
    </div>
  )
}

export default ViewTask;