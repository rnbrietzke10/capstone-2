import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../ApiHelper';
import './UpdateUserForm.scss';
import { UserContext } from '../../contexts/UserContext';

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = localStorage.getItem('token');
  console.log(currentUser);
  const [itemData, setItemData] = useState(currentUser);
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
      const updatedInfo = {
        firstName: itemData.firstName,
        lastName: itemData.lastName,
        email: itemData.email,
        username: itemData.username,
        profileImg: itemData.profileImg,
        coverImg: itemData.coverImg,
      };

      const user = await Api.updateUser(updatedInfo, itemData.username, token);

      setCurrentUser(user);
    }
    updateData();
    navigate('/');
  };
  const logoutHandler = async () => {
    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  const handleDelete = async () => {
    const data = {
      id: currentUser.id,
      username: currentUser.username,
    };
    await Api.deleteUser(data, token);
    logoutHandler();
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-input-container'>
            {/* <label htmlFor='username'>Username:</label> */}
            <input
              id='username'
              type='text'
              name='username'
              value={itemData.username}
              placeholder='Enter your username'
              className='form-input'
              onChange={handleChange}
            />
          </div>
          <div className='form-input-container'>
            {/* <label htmlFor='firstName'>First Name:</label> */}
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
            {/* <label htmlFor='lastName'>Last Name:</label> */}
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
            {/* <label htmlFor='email'>Email:</label> */}
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
          <div className='form-input-container'>
            {/* <label htmlFor='profileImg'>Profile Picture:</label> */}
            <input
              id='profileImg'
              type='profileImg'
              name='profileImg'
              value={itemData.profileImg}
              placeholder='Enter Your Profile Picture link'
              className='form-input'
              onChange={handleChange}
            />
          </div>
          <div className='form-input-container'>
            {/* <label htmlFor='coverImg'>Cover Photos:</label> */}
            <input
              id='coverImg'
              type='coverImg'
              name='coverImg'
              value={itemData.coverImg}
              placeholder='Enter Your Cover Photo'
              className='form-input'
              onChange={handleChange}
            />
          </div>
          <div className='btn-container'>
            <button className='btn btn-dark'>Save Changes</button>
            <button
              onClick={handleDelete}
              className='btn delete-btn'
              type='button'
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
