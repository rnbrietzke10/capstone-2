import { useContext, useState } from 'react';

import Api from '../../ApiHelper';
import './CommentForm.scss';
import { UserContext } from '../../contexts/UserContext';
import { CommentsContext } from '../../contexts/CommentsContext';

const CommentForm = ({ postId }) => {
  let INITIAL_STATE = { content: '' };
  const { currentUser } = useContext(UserContext);
  const { setComments } = useContext(CommentsContext);

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    async function addComment() {
      const token = await localStorage.getItem('token');
      const updatedInfo = {
        content: itemData.content,
        userId: currentUser.id,
      };

      await Api.createComment(updatedInfo, postId, token);
      setItemData(INITIAL_STATE);
      const res = await Api.getComments(postId);
      const updatedComments = {};
      updatedComments[postId] = res;
      setComments(comments => ({ ...updatedComments, ...comments }));
    }
    addComment();
  };
  return (
    <div className='CommentForm'>
      <div
        className='profile-img'
        style={{
          backgroundImage: `url(${currentUser.profileImg})`,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          id='content'
          type='text'
          name='content'
          value={itemData.content}
          placeholder={`Write a comment...`}
          onChange={handleChange}
        />
        <div className='form-input-row'>
          <div className='form-input-col'>
            <button disabled={!itemData.content} className='btn btn-dark'>
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
