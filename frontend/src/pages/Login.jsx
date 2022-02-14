import { Fragment, useState, useEffect } from "react";
import { FaSignInAlt } from 'react-icons/fa';

// redux dev tools
import { useSelector, useDispatch } from "react-redux";
import { loginAction, reset } from "../store/auth/authSlice";

// React Router
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authReducer);

// setup states for form data
const [formData, setFormData] = useState({
    email: '',
    password: ''
});
const { email, password } = formData;


// Reset after all action is done.
useEffect(() =>{
if(isError) {
    toast.error(message);
}
if(isSuccess || user) {
    navigate('/');
}
dispatch(reset());
},[isError, isSuccess, user, message, navigate, dispatch]);

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
   const userData = {
       email,
       password
   };
   dispatch(loginAction(userData));
    };

return (
<Fragment>
<section className="heading">
      <h1>
          <FaSignInAlt /> Login
      </h1>
      <p>Log in Here</p>
  </section>
  <section className="form">
      <form onSubmit={onFormSubmit}>
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
           <button className="btn btn-block">Submit</button>
       </div>
      </form>
  </section>
</Fragment>
);
};


export default Login;




