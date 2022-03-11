import { Link } from "react-router-dom";

import "./closeFriend.css";

const CloseFriend = ({user}) => {
  return (
    <Link to={`/profile/${user._id}`}>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.imageUrl} alt={user.username} />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
    </Link>
  );
}

export default CloseFriend;