import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Api from '../../ApiHelper';

import './EditPostForm.scss';
import { UserContext } from '../../contexts/UserContext';
const EditPostForm = ({ postData }) => {
  const user = useContext(UserContext);

  const [itemData, setItemData] = useState(postData);

  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    async function updatePost() {
      const token = await localStorage.getItem('token');
      const userId = user.id;
      console.log('type of', typeof userId);
      const updatedInfo = {
        content: itemData.content,
        img: itemData.img,
      };

      await Api.updatePost(updatedInfo, token);
    }
    updatePost();
  };
  let disabled = true;
  if (postData.content !== itemData.content || postData.img !== itemData.img) {
    disabled = false;
  }
  return (
    <div className='EditPostForm'>
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
          <input
            id='img'
            type='text'
            name='img'
            value={itemData.img}
            placeholder={`Add image URL`}
            onChange={handleChange}
          />

          <button disabled={disabled} className='btn btn-dark'>
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
