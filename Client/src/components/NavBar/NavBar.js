import { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';
import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faBars,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [clickLakes, setClickLakes] = useState(false);
  const [clickRivers, setClickRivers] = useState(false);
  const [click, setClick] = useState(false);
  const iconStyles = {
    color: '#ffffff',
    marginLeft: '10px',
    cursor: 'pointer',
  };
  const handleClickLakes = () => {
    setClickRivers(false);
    setClickLakes(!clickLakes);
  };

  const handleClickRivers = () => {
    setClickLakes(false);
    setClickRivers(!clickRivers);
  };

  const handleClick = (e) => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
      setClickLakes(false);
      setClickRivers(false);
      setClick(!click);
    }
  };
  const handleCloseMenus = () => {
    setClickLakes(false);
    setClickRivers(false);
    setClick(false);
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <div className="logo" onClick={handleCloseMenus}></div>
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <FontAwesomeIcon
          icon={click ? faXmark : faBars}
          size="xl"
          style={{ color: '#ffffff' }}
          className=""
        />
      </div>
      <div
        className={click ? 'route_links active' : 'route_links inactive'}
        onClick={handleClick}
      >
        <div className="nav_link_container dropdown" onClick={handleClickLakes}>
          <span className="nav_link">Lakes</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            size="md"
            style={iconStyles}
            className="fa_angle_down"
          />
          {clickLakes ? (
            <Dropdown
              items={Object.keys(lakes)}
              locationsInfo={lakes}
              type="lakes"
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>
        <div
          onClick={handleClickRivers}
          className="nav_link_container dropdown"
        >
          <span className="nav_link">Rivers</span>
          <FontAwesomeIcon
            icon={faAngleDown}
            size="md"
            style={iconStyles}
            className="fa_angle_down"
          />
          {clickRivers ? (
            <Dropdown
              items={Object.keys(rivers)}
              locationsInfo={rivers}
              type="rivers"
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>
        {!user ? (
          <>
            <div className="nav_link_container">
              <Link
                to="/register"
                className="nav_link"
                onClick={handleCloseMenus}
              >
                Register
              </Link>
            </div>

            <div className="nav_link_container">
              <Link to="/login" className="nav_link" onClick={handleCloseMenus}>
                Login
              </Link>
            </div>
          </>
        ) : (
          <div className="nav_link_container">
            <Link
              className="nav_link"
              to={`/users/${user.username}`}
              onClick={handleCloseMenus}
            >
              {user.username}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
