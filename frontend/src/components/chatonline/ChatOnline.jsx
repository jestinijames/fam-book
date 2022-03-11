import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserFriends, reset } from "../../store/auth/authSlice";



import Spinner from "../Spinner";

import "./chatOnline.css";
import { toast } from "react-toastify";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
   // const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    
    const { user, isLoading, isError, isSuccess, message, friends  } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if(isError) {
        toast.error(message);
    }
    if(isSuccess) {
      dispatch(reset());
    }
    dispatch(fetchUserFriends(user._id));
      

    }, [currentId, isError, message]);
  
    useEffect(() => {
      friends && setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);


  
    const handleClick = async (user) => {
      // try {
      //   const res = await axios.get(
      //     `/conversations/find/${currentId}/${user._id}`
      //   );
      //   setCurrentChat(res.data);
      // } catch (err) {
      //   console.log(err);
      // }
    };

    if(isLoading) {
      return <Spinner/>;
    }

    return (
      <div className="chatOnline">
        {onlineFriends && onlineFriends.map((o) => (
          <div key={o._id} className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={o.imageUrl}
                alt={o.username}
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
        ))}
      </div>
    );
}

export default ChatOnline;