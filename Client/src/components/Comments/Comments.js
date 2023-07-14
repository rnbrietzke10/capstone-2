import { useState, useEffect } from 'react';

import CommentForm from '../CommentForm/CommentForm';
import Api from '../../ApiHelper';

import './Comments.scss';
import UserComment from '../UserComment/UserComment';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const data = await Api.getComments();
      console.log(data);
      setComments(data);
    };

    getComments();
  }, []);

  return (
    <div className='Comments'>
      <CommentForm />
      {Comments.map(info => (
        <UserComment info={info} key={info.commentId} />
      ))}
    </div>
  );
};

export default Comments;
