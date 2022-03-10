import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import { useNavigate, Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { registerAction, uploadAvatar, reset } from "../../store/auth/authSlice";

// Components
import Spinner from "../../components/Spinner";
import Logo from "../../components/Logo";

// Styles
import './register.css';



const Register = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.authReducer);

// setup states for form data
const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
});
const { username, email, password, password2 } = formData;


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
    
    const [avatarError, setAvatarError] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    
        const handleFileChange = (e) => {
            let selected = e.target.files[0];
            if(!selected){
                setAvatarError('Please select a file');
                toast.error(avatarError);
                return;
            }
            if (!selected.type.includes('image')) {
                setAvatarError('Selected file must be an image');
                toast.error(avatarError);
                return;
            }
            if (selected.size > 150000) {
                setAvatarError('Image file size must be less than 100kb');
                toast.error(avatarError);
                return;
            }
    
            setAvatarError(null);
            setUserAvatar(selected);
            
        };    

// Handle form submission
const onFormSubmit = (e) => {
e.preventDefault();
if(password !== password2) {
    toast.error('Passwords do not match');
} else if(avatarError) {
    toast.error(avatarError);
}
else {

const userData = {
        username,
        email,
        password,
};

if(userAvatar){
    const data = new FormData();
    const fileName = Date.now() +  (userAvatar.name).replace(/ /g, "-").toLowerCase();
    data.append("name", fileName);
    data.append("file", userAvatar);
    userData.avatar = fileName;
     dispatch(uploadAvatar(data));
}

 dispatch(registerAction(userData));

}
};

if(isLoading) {
    return <Spinner />
}

return (
<>
<div className="login">
<div className="loginWrapper">
  <Logo/>
  <div className="loginRight">
  <section className="heading">
      <h1>
          <FaUser /> Register 
      </h1>
      <p>Create Account Here</p>
  </section>
    <form className="loginBox" onSubmit={onFormSubmit}>
      <input
        className="loginInput"
        type="text"
       id="username"
       name="username"
       value={username}
       onChange={onValueChange}
       placeholder='Enter name'
       required
       autoComplete="off"
      />
      <input
       className="loginInput"
       type="file"
       id="avatar"
       name="avatar"
       accept=".png,.jpeg,.jpg"
       onChange={handleFileChange}
       placeholder='Avatar'
       required
      />
      <input
        type="email"
        className="loginInput"
        id="email"
        name="email"
        value={email}
        onChange={onValueChange}
        placeholder='Enter email'
        required
        autoComplete="off"
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
       
       <input 
       type="password"
       className="loginInput"
       id="password2"
       name="password2"
       value={password2}
       onChange={onValueChange}
       placeholder='Confirm password'
       required
       />
      <button className="loginButton" type="submit">
        Sign Up
      </button>
      <Link className="loginForgot" to='/login'>Log into Account</Link>
    </form>
  </div>
</div>
</div>
</>
);
};


export default Register;




