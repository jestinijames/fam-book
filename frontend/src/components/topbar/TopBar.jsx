import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutAction, fetchImages, reset } from "../../store/auth/authSlice";

import axios from 'axios';



import "./topbar.css";



const TopBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { user, userImg } = useSelector((state) => state.authReducer);
  



    const onLogout = () => {
        dispatch(logoutAction());
        dispatch(reset());
        navigate('/');
    };

    useEffect(()=> {
      dispatch(fetchImages(user.avatar));
    },[]);

    return (
        <div className="topbarContainer">
          <div className="topbarLeft">
           <Link to='/'> <span className="logo">FamBook</span> </Link>
          </div>
          <div className="topbarCenter">
            <div className="searchbar">
              <Search className="searchIcon" />
              <input
                placeholder="Search for friends, post or video"
                className="searchInput"
              />
            </div>
          </div>
          <div className="topbarRight">
            <div className="topbarLinks">
             {/* {user && <span className="topbarLink"><Link to={'/profile/'+user._id}>My Profile</Link></span> }
              <span className="topbarLink"><Link to='/dashboard'>My Dashboard</Link></span>  */}
            </div>
            <div className="topbarIcons">
              <div className="topbarIconItem">
                <Person />
                <span className="topbarIconBadge">1</span>
              </div>
              <div className="topbarIconItem">
                <Chat />
                <span className="topbarIconBadge">2</span>
              </div>
              <div className="topbarIconItem">
                <Notifications />
                <span className="topbarIconBadge">1</span>
              </div>
            </div>
            {userImg && <> <img src={userImg} alt="" className="topbarImg"/>
              <button onClick={onLogout} className="btn">Logout</button></> }
          </div>
        </div>
      );
}


export default TopBar;