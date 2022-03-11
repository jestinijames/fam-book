import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser, reset } from '../../store/auth/authSlice';

import { toast } from 'react-toastify';

// Components
import Spinner from '../Spinner';

// Styles
import './conversation.css';

const Conversation = ({ conversation, currentUser }) => {

  const { isLoading, isSuccess, isError, message, profile } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();  

useEffect(()=>{
  if(isError) {
    toast.error(message);
}
if(isSuccess) {
  dispatch(reset());
}
const friendId = conversation.members.find((m) => m !== currentUser._id);
dispatch(fetchUser(friendId));


},[conversation, currentUser, dispatch, isError, message]);

if(isLoading) {
  return <Spinner/>;
}

  return (
    <div className="conversation">
      {profile &&  <><img src={profile.imageUrl} alt={profile.name} className="conversationImg" />
        <span className="conversationName">{profile.name}</span></> }
    </div>
  )
}

export default Conversation;