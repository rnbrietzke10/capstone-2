import { useState, useEffect } from 'react';

import CommentForm from '../CommentForm/CommentForm';

import './Comments.scss';
import UserComment from '../UserComment/UserComment';

const Comments = ({ comments, postId }) => {
  return (
    <div className='Comments'>
      <CommentForm postId={postId} />
      {comments
        ? comments.map(info => (
            <UserComment postId={postId} info={info} key={info.commentId} />
          ))
        : ''}
    </div>
  );
};

export default Comments;
