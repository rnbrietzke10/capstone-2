import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../ApiHelper';
import './UpdateUserForm.scss';

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const INITIAL_STATE = JSON.parse(localStorage.getItem('user'));
  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = e => {
    const { name, value } = e.target;
    setItemData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const allDataEntered =
      itemData.firstName &&
      itemData.lastName &&
      itemData.email &&
      itemData.username;
    if (!allDataEntered) {
      alert('Please enter all information');
    }
    async function updateData() {
      const token = await localStorage.getItem('token');
      const updatedInfo = {
        firstName: itemData.firstName,
        lastName: itemData.lastName,
        email: itemData.email,
      };

      const user = await Api.updateUser(updatedInfo, itemData.username, token);

      localStorage.setItem('user', JSON.stringify(user));
    }
    updateData();
    navigate('/');
  };

  return (
    <div className='wrapper outer-container '>
      <div className='form-container'>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-input-container'>
            <label htmlFor='username'>Username:</label>
            <input
              disabled
              id='username'
              type='text'
              name='username'
              value={itemData.username}
              placeholder='Enter your username'
              className='form-input'
            />
          </div>
          <div className='form-input-container'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              id='firstName'
              type='text'
              name='firstName'
              value={itemData.firstName}
              placeholder='Enter your First Name'
              className='form-input'
              onChange={handleChange}
            />
          </div>
          <div className='form-input-container'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              id='lastName'
              type='text'
              name='lastName'
              value={itemData.lastName}
              placeholder='Enter your Last Name'
              className='form-input'
              onChange={handleChange}
            />
          </div>{' '}
          <div className='form-input-container'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              name='email'
              value={itemData.email}
              placeholder='Enter your email'
              className='form-input'
              onChange={handleChange}
            />
          </div>
          <button className='btn submit-btn'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
