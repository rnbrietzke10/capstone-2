import { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../contexts/UserContext';

import Api from '../../ApiHelper';

import './EditCommentForm.scss';
import { CommentsContext } from '../../contexts/CommentsContext';

const EditCommentForm = props => {
  const { currentUser } = useContext(UserContext);
  const { comments, setComments } = useContext(CommentsContext);
  const { commentData } = props;
  console.log(commentData);
  const [itemData, setItemData] = useState(commentData);

  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    async function updateComment() {
      const token = await localStorage.getItem('token');

      const updatedInfo = {
        content: itemData.content,
        commentId: commentData.commentId,
        postId: commentData.postId,
        currentUserUsername: currentUser.username,
      };
      await Api.updateComment(updatedInfo, token);
      // Get list of comments

      const res = await Api.getComments(commentData.postId);
      const updatedComments = {};
      updatedComments[commentData.postId] = res;
      console.log('updatedComments: ', updatedComments);
      setComments(comments => ({ ...updatedComments, ...comments }));
    }
    updateComment();
  };
  let disabled = true;
  if (commentData.content !== itemData.content) {
    disabled = false;
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='EditCommentForm'>
          <form id='editCommentForm' onSubmit={handleSubmit}>
            <div className='form-input-row'>
              <label htmlFor='content'>Content: </label>
              <input
                id='content'
                type='text'
                name='content'
                value={itemData.content}
                placeholder={`What's on your mind?`}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type='submit'
          form='editCommentForm'
          disabled={disabled}
          className='btn btn-dark'
          onClick={props.onHide}
        >
          Update Comment
        </button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCommentForm;
