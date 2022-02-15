import React, { Fragment } from 'react';
import { FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, reset } from '../store/notes/noteSlice';


const NoteItem = ({ note, taskId }) => {

    const { user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

const deleteNote = (e) => {
  e.stopPropagation();
let noteData  = {
  noteId: note._id,
  taskId
};
dispatch(deleteNoteAction(noteData));
dispatch(reset);
};

  return (
    <Fragment>
  <div className='note' style={{
      backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)': '#fff',
      color: note.isStaff ? '#fff': '#000'
      }}>
       <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>   
       <p>{note.text}</p>
       <div className='note-date'>
           { new Date(note.createdAt).toLocaleString('en-US') }
           <button onClick={deleteNote} className='btn'><FaMinus/>Delete</button>
       </div>
  </div>
  </Fragment>
  );
};

export default NoteItem;