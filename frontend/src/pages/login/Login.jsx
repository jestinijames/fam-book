import { Fragment, useState, useEffect } from "react";
import { FaSignInAlt } from 'react-icons/fa';

// redux dev tools
import { useSelector, useDispatch } from "react-redux";
import { loginAction, reset } from "../../store/auth/authSlice";

// React Router
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import Spinner from "../../components/Spinner";
import Logo from "../../components/Logo";

// Styles
import './login.css';



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

    if(isLoading) {
        return <Spinner />
    }

return (
<Fragment>
<div className="login">
    <div className="loginWrapper">
      <Logo/>

      <div className="loginRight">
      <section className="heading">
      <h1>
          <FaSignInAlt /> Login
      </h1>
      <p>Log in Here</p>
  </section>
        <form className="loginBox" onSubmit={onFormSubmit} >
          <input
            type="email"
            className="loginInput"
            id="email"
            name="email"
            value={email}
            onChange={onValueChange}
            placeholder='Enter email'
          />
          <input 
           type="password"
           className="loginInput"
           id="password"
           name="password"
           value={password}
           onChange={onValueChange}
           placeholder='Enter password'
           required
           />
           <button className="loginButton">Submit</button> 
           <span className="loginForgot">Forgot Password?</span>
           <Link className="loginForgot" to='/register'>Create a new Account</Link>
          {/* <button className="loginButton" type="submit" disabled={isFetching}>
          Log In
          </button>
          
          <button className="loginRegisterButton">
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Create a New Account"
            )}
          </button> */}
        </form>
      </div>
    </div>
  </div>
</Fragment>
);
};


export default Login;




