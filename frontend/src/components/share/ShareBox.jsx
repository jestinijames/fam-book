import React from 'react';

import { useSelector } from 'react-redux';

// Styles
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons";
import './sharebox.css';



const ShareBox = () => {

  const { user, userImg } = useSelector((state) => state.authReducer); 

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
        {user && userImg && 
        <>
        <img className="shareProfileImg" src={userImg} alt="" />
        <input
          placeholder={`What do you want to share today, ${user.name} ?`}
          className="shareInput"
        />
        </>
        }  
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="btn">Share</button>
        </div>
      </div>
    </div>
  );
}

export default ShareBox;