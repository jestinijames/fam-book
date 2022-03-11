import React, { useEffect } from 'react';


import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';

import { fetchUsers, reset } from '../../store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import "./sidebar.css";


const Sidebar = () => {

  const { users, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch])

 const allUsers = users && user && users.filter((u) => u._id !== user._id); 

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h4 className="rightbarTitle">All Users</h4>
        <ul className="sidebarFriendList">
          {allUsers && allUsers.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;