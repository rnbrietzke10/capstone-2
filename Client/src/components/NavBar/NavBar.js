import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <div className="logo"></div>
        </Link>
      </div>
      <div className="route_links">
        <Link to="/lakes" className="nav_link">
          Lakes
        </Link>
        <Link to="/rivers" className="nav_link">
          Rivers
        </Link>
        <Link to="/register" className="nav_link">
          Register
        </Link>
        <Link to="/login" className="nav_link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
