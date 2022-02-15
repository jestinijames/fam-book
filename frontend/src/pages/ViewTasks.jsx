import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTasksAction, reset } from '../store/tasks/taskSlice';

// Components
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TaskItem from '../components/TaskItem';




const ViewTasks = () => {
  const dispatch = useDispatch();

  const { isLoading, tasks, isSuccess, isError } = useSelector((state) => state.taskReducer);


 useEffect(() => {
// Clean up function
return () => {
  if(isSuccess) {
    dispatch(reset());
  }
}
 },[dispatch, isSuccess])

  useEffect(() => {
   dispatch(getTasksAction());
  },[dispatch])




  if(isLoading) {
    return <Spinner />
  }

  if(tasks && tasks.length) {
    return (
      <Fragment>
        <BackButton url='/' />
        <h1>Tasks</h1>
        <div className="tickets">
          <div className="ticket-headings">
            <div>Date</div>
            <div>Type</div>
            <div>Status</div>
            <div></div>
          </div>
          {tasks.map((task) => {
           return <TaskItem key={task._id} task={task} />
          })}
        </div>
      </Fragment>
     )
  }


  return <h3>No Tasks For Today.</h3>

  
}

export default ViewTasks