import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Api from '../../ApiHelper';
import './PostForm.scss';
const PostForm = () => {
  const [addUploadImg, setAddUploadImg] = useState(false);
  let INITIAL_STATE = { content: '', img: '' };
  const user = JSON.parse(localStorage.getItem('user'));

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleClick = () => setAddUploadImg(!addUploadImg);

  const handleSubmit = e => {
    e.preventDefault();

    async function addPost() {
      const token = await localStorage.getItem('token');
      const updatedInfo = {
        content: itemData.content,
        username: user.username,
      };

      await Api.createPost(updatedInfo, token);
      setItemData(INITIAL_STATE);
    }
    addPost();
  };
  return (
    <div className='PostForm'>
      <div
        className='profile-img'
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/209810/pexels-photo-209810.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          id='content'
          type='text'
          name='content'
          value={itemData.content}
          placeholder={`What's on your mind?`}
          onChange={handleChange}
        />
        <div className='form-input-row'>
          {addUploadImg ? (
            <input
              id='img'
              type='text'
              name='img'
              value={itemData.img}
              placeholder={`Add image URL`}
              onChange={handleChange}
            />
          ) : (
            ''
          )}
          <div className='form-input-col'>
            <FontAwesomeIcon
              size='xl'
              className='img-icon'
              onClick={handleClick}
              icon={faImage}
            />
            <button disabled={!itemData.content} className='btn btn-dark'>
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
