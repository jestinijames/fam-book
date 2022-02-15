import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTaskAction, reset } from "../store/tasks/taskSlice";


const TaskItem = ({ task }) => {


const dispatch = useDispatch();

const deleteTask = (e) => {
e.stopPropagation();
 dispatch(deleteTaskAction(task._id));
dispatch(reset());
};

  return (
    <Fragment>
    <div className="ticket">
        <div>
            {
            new Date(task.createdAt).toLocaleString('en-US')
            }
        </div>
        <div>{task.type}</div>
        <div className={`status status-${task.status}`}>
            {task.status}
        </div>
       <Link to={`/task/${task._id}`} className="btn btn-reverse btn-sm" >
           View
           </Link>
           <div>
    <button onClick={deleteTask} className="btn btn-sm">Delete</button> 
    </div>
    </div>

    </Fragment>
  )
}

export default TaskItem;