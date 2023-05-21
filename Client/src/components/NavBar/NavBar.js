import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';
import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import UserProfileDropdown from '../UserProfileDropdown/UserProfileDropdown';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const [clickLakes, setClickLakes] = useState(false);
  const [clickRivers, setClickRivers] = useState(false);
  const [clickUserProfile, setClickUserProfile] = useState(false);
  const [click, setClick] = useState(false);

  const handleClickLakes = () => {
    setClickRivers(false);
    setClickUserProfile(false);
    setClickLakes(!clickLakes);
  };

  const handleClickRivers = () => {
    setClickLakes(false);
    setClickUserProfile(false);
    setClickRivers(!clickRivers);
  };

  const handleClickUserProfile = () => {
    setClickLakes(false);
    setClickRivers(false);
    setClickUserProfile(!clickUserProfile);
  };

  const handleClick = e => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
      setClickLakes(false);
      setClickRivers(false);
      setClickUserProfile(false);
      setClick(!click);
    }
  };
  const handleCloseMenus = () => {
    setClickLakes(false);
    setClickRivers(false);
    setClickUserProfile(false);
    setClick(false);
  };

  return (
    <div className='navbar'>
      <div>
        <Link to='/'>
          <div className='logo' onClick={handleCloseMenus}></div>
        </Link>
      </div>
      <div className='menu-icon' onClick={handleClick}>
        <FontAwesomeIcon
          icon={click ? faXmark : faBars}
          size='xl'
          style={{ color: '#ffffff' }}
          className=''
        />
      </div>
      <div
        className={click ? 'route_links active' : 'route_links inactive'}
        onClick={handleClick}
      >
        <div className='nav_link_container dropdown' onClick={handleClickLakes}>
          <span className='nav_link'>Lakes</span>

          {clickLakes ? (
            <Dropdown
              items={Object.keys(lakes)}
              locationsInfo={lakes}
              type='lakes'
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>
        <div
          onClick={handleClickRivers}
          className='nav_link_container dropdown'
        >
          <span className='nav_link'>Rivers</span>

          {clickRivers ? (
            <Dropdown
              items={Object.keys(rivers)}
              locationsInfo={rivers}
              type='rivers'
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>
        {console.log(currentUser)}
        {!currentUser ? (
          <>
            <div className='nav_link_container'>
              <Link
                to='/register'
                className='nav_link'
                onClick={handleCloseMenus}
              >
                Register
              </Link>
            </div>
            <div className='nav_link_container'>
              <Link to='/login' className='nav_link' onClick={handleCloseMenus}>
                Login
              </Link>
            </div>
          </>
        ) : (
          <div onClick={handleClickUserProfile} className='nav_user_link'>
            <Link to={`/users/${currentUser.username}`}>
              <div
                className='user_info nav_link'
                style={{
                  backgroundImage: `url(${currentUser.profileImg})`,
                }}
              />
            </Link>
            <span
              onClick={handleClickUserProfile}
              className='nav_link user_profile_mobile'
            >
              {currentUser.username}
            </span>
          </div>
        )}
        {clickUserProfile ? (
          <UserProfileDropdown
            info={{ ...currentUser, path: `/users/${currentUser.username}` }}
            handleCloseMenus={handleCloseMenus}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default NavBar;
