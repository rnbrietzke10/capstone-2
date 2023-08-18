import { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../contexts/UserContext';

import Api from '../../ApiHelper';

import './EditPostForm.scss';
import { PostsContext } from '../../contexts/PostsContext';
const EditPostForm = props => {
  const { currentUser } = useContext(UserContext);
  const { setPosts } = useContext(PostsContext);
  const { postData } = props;
  const [itemData, setItemData] = useState(postData);

  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    async function updatePost() {
      const token = await localStorage.getItem('token');

      const updatedInfo = {
        content: itemData.content,
        img: itemData.img,
        currentUserUsername: postData.currentUserUsername,
      };

      await Api.updatePost(updatedInfo, postData.id, token);
      const updatedPosts = await Api.getPosts();
      setPosts(updatedPosts);
    }
    updatePost();
  };
  let disabled = true;
  if (postData.content !== itemData.content || postData.img !== itemData.img) {
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
        <div className='EditPostForm'>
          <form id='editPostForm' onSubmit={handleSubmit}>
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
            <div className='form-input-row'>
              <label htmlFor='img'>Image Url: </label>
              <input
                id='img'
                type='text'
                name='img'
                value={itemData.img}
                placeholder={`Add image URL`}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type='submit'
          form='editPostForm'
          disabled={disabled}
          className='btn btn-dark'
          onClick={props.onHide}
        >
          Update Post
        </button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostForm;
