import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, createTaskAction } from "../store/tasks/taskSlice";
import { toast } from 'react-toastify';

// components
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTask = () => {

    const { user } = useSelector((state) => state.authReducer);
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.taskReducer);
  
    const [type, setType] = useState('personal');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate  = useNavigate();


    // Reset all auth values (loading, error, success, message)
useEffect(() => {
    if(isError) {
        toast.error(message);
    }
    // redirect when logged in
    if(isSuccess) {
        dispatch(reset());
        navigate('/tasks');
    }
    dispatch(reset());
    
    
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onFormSubmit = ((e)=> {
     e.preventDefault();
     const userTask = {
         type,
         description
     };
     dispatch(createTaskAction(userTask));
     

    });

    if(isLoading) {
        return <Spinner/>
    }

return (
<Fragment>
    <BackButton url='/' />
<section className="heading">
<h1>Create New Task</h1>
<p>Fill out the form below</p>
</section>

<section className="form">
    <div className="form-group">
      <label htmlFor="uname">Name</label>
      <input type="text" className="form-control" value={user.name} name="uname" disabled />
    </div>
    <div className="form-group">
      <label htmlFor="uemail">Email</label>
      <input type="text" className="form-control" value={user.email} name="uemail" disabled />
    </div>
    <form onSubmit={onFormSubmit}>
    <div className="form-group">
        <label htmlFor="utype">Type</label>
        <select 
        name="utype" 
        id="utype" 
        value={type} 
        onChange={(e) => setType(e.target.value)}>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="family">Family</option>
        </select>
        </div>
        <div className="form-group">
        <label htmlFor="udescription">Detailed Description</label>
        <textarea 
        name="udescription" 
        id="udescription"
        className="form-control"
        placeholder="Describe the task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        </div>
        <div className="form-group">
            <button className="btn btn-block">Create it</button>
            </div>
    </form>
</section>
</Fragment>
);
};

export default NewTask;