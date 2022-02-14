import { Fragment, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { registerAction, reset } from "../store/auth/authSlice";

// Loader
import Spinner from "../components/Spinner";


const Register = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authReducer);

// setup states for form data
const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
});
const { name, email, password, password2 } = formData;


// Reset all auth values (loading, error, success, message)
useEffect(() => {
if(isError) {
    toast.error(message);
}
// redirect when logged in
if(isSuccess || user) {
    navigate('/');
}

dispatch(reset());

}, [isError, isSuccess, user, message, navigate, dispatch]);



// Handle input change
const onValueChange = (e) => {
setFormData(
    (prevState) => ({
        ...prevState, [e.target.name] : e.target.value
    }));
};

// Handle form submission
const onFormSubmit = (e) => {
e.preventDefault();
if(password !== password2) {
    toast.error('Passwords do not match');
} else {
    const userData = {
      name,
      email,
      password  
    };
   dispatch(registerAction(userData));

}
};

if(isLoading) {
    return <Spinner />
}

return (
<Fragment>
  <section className="heading">
      <h1>
          <FaUser /> Register 
      </h1>
      <p>Create Account Here</p>
  </section>
  <section className="form">
      <form onSubmit={onFormSubmit}>
       <div className="form-group">
           <input 
           type="text"
           className="form-control"
           id="name"
           name="name"
           value={name}
           onChange={onValueChange}
           placeholder='Enter name'
           required
           />
       </div>
       <div className="form-group">
           <input 
           type="email"
           className="form-control"
           id="email"
           name="email"
           value={email}
           onChange={onValueChange}
           placeholder='Enter email'
           required
           />
       </div>
       <div className="form-group">
           <input 
           type="password"
           className="form-control"
           id="password"
           name="password"
           value={password}
           onChange={onValueChange}
           placeholder='Enter password'
           required
           />
       </div>
       <div className="form-group">
           <input 
           type="password"
           className="form-control"
           id="password2"
           name="password2"
           value={password2}
           onChange={onValueChange}
           placeholder='Confirm password'
           required
           />
       </div>
       <div className="form-group">
           <button className="btn btn-block">Submit</button>
       </div>
      </form>
  </section>
</Fragment>
);
};


export default Register;




