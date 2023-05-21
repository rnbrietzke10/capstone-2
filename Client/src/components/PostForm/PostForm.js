import { useState } from 'react';

import Api from '../../ApiHelper';
import './PostForm.scss';
const PostForm = () => {
  let INITIAL_STATE = { content: '' };
  const user = JSON.parse(localStorage.getItem('user'));

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };
  let pagePostedOn;
  if (window.location.pathname === '/') {
    pagePostedOn = 'homepage';
  } else {
    pagePostedOn = window.location.pathname;
  }

  const handleSubmit = e => {
    e.preventDefault();

    async function addPost() {
      const token = await localStorage.getItem('token');
      const updatedInfo = {
        content: itemData.content,
        username: user.username,
        pagePostedOn: pagePostedOn,
      };

      await Api.createPost(updatedInfo, token);
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
        <button disabled={!itemData.content} className='btn btn-dark'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default PostForm;
