import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserProfileDropdown.scss';
import { UserContext } from '../../contexts/UserContext';

const UserProfileDropdown = ({ info, handleCloseMenus }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const logoutHandler = async () => {
    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <ul
      onClick={handleClick}
      className={click ? 'user-dropdown-menu clicked' : 'user-dropdown-menu'}
    >
      <li>
        <Link
          to={info.path}
          onClick={handleCloseMenus}
          className='dropdown-link'
        >{`${info.username}'s Profile`}</Link>
      </li>
      <li>
        <Link
          to={`${info.path}/update`}
          onClick={handleCloseMenus}
          className='dropdown-link'
        >
          Update Profile
        </Link>
      </li>
      <li>
        <div onClick={logoutHandler} className='dropdown-link'>
          Log out
        </div>
      </li>
    </ul>
  );
};

export default UserProfileDropdown;
