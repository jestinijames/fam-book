import React from 'react';


import Post from '../post/Post';
import ShareBox from '../share/ShareBox';

import './feed.css';
import { Posts } from '../../dummyData';

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <ShareBox />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feed;