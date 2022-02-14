import { Fragment } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, reset } from "../store/auth/authSlice";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer);

const onLogout = () => {
dispatch(logoutAction());
dispatch(reset());
navigate('/');
};

return (
<Fragment>
    <header className="header">
        <div className="logo">
            <Link to='/'>Home</Link>
        </div>
        <ul>
            {user ? (<li><button onClick={onLogout} className="btn"><FaSignOutAlt/>Logout</button></li>) : (<Fragment><li><Link to='/login'><FaSignInAlt />Login</Link></li>
            <li><Link to='/register'><FaUser />Register</Link></li></Fragment>)}
            
            </ul> 
    </header>
</Fragment>
);
};
export default Header;