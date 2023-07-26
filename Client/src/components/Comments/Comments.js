import { useState, useEffect } from 'react';

import CommentForm from '../CommentForm/CommentForm';
import Api from '../../ApiHelper';

import './Comments.scss';
import UserComment from '../UserComment/UserComment';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = async () => {
      const data = await Api.getComments(postId);

      setComments(data);
    };

    getAllComments();
  }, []);

  return (
    <div className='Comments'>
      <CommentForm />
      {comments
        ? comments.map(info => (
            <UserComment postId={postId} info={info} key={info.commentId} />
          ))
        : ''}
    </div>
  );
};

export default Comments;
