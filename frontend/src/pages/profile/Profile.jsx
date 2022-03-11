import { Fragment, useEffect, useState } from "react";

import { useSelector,  useDispatch } from 'react-redux';

 import { fetchUser, reset } from '../../store/auth/authSlice';

// Components
import TopBar from "../../components/topbar/TopBar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Spinner from '../../components/Spinner';

import { toast } from 'react-toastify';
import axios from "axios";


// react-router
import { useParams } from 'react-router-dom';

import './profile.css';


const Profile = () => {

  const { id } = useParams(); 


    const { isLoading, isSuccess, isError, message, profile } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isError) {
          toast.error(message);
      }
      if(isSuccess) {
        dispatch(reset());
    }
    
        dispatch(fetchUser(id));
      },[dispatch, isError, message])

if(isLoading) {
    return <Spinner/>;
}

return (
  <>
  <TopBar />
  <div className="profile">
    <Sidebar />
    <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
          <img
            className="profileCoverImg"
            src="https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
          {profile && <img
            className="profileUserImg"
            src={profile.imageUrl}
            alt={profile.name}
          />}
        </div>
        {profile && <div className="profileInfo">
          <h4 className="profileInfoName">{profile.name}</h4>
          <span className="profileInfoDesc">
          {profile.info.country}
            </span>
        </div>}
      </div>
      <div className="profileRightBottom">
        {profile && <><Feed username={id} />
        <Rightbar user={profile} /></>}
      </div>
    </div>
  </div>
</>
);

};

export default Profile;