import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfileDropdown.scss';

const UserProfileDropdown = ({ info, handleCloseMenus }) => {
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
        <Link to='/logout' onClick={handleCloseMenus} className='dropdown-link'>
          Log out
        </Link>
      </li>
    </ul>
  );
};

export default UserProfileDropdown;
