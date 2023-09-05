import CommentForm from '../CommentForm/CommentForm';

import './Comments.scss';
import UserComment from '../UserComment/UserComment';
import { useContext } from 'react';
import { CommentsContext } from '../../contexts/CommentsContext';

const Comments = ({ postId }) => {
  const { comments } = useContext(CommentsContext);

  return (
    <div className='Comments'>
      <CommentForm postId={postId} />
      {comments[postId]
        ? comments[postId].map(info => (
            <UserComment postId={postId} info={info} key={info.commentId} />
          ))
        : ''}
    </div>
  );
};

export default Comments;
