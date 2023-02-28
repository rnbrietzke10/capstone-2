import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
const NavBar = () => {
  return (
    <div className="container-f space">
      <div>
        <Link to="/">
          <div className="nav__site-logo"></div>
        </Link>
      </div>
      <div className="nav__route_links">
        <Link to="/lake" className="nav_link">
          Lakes
        </Link>
        <Link to="/rivers" className="nav_link">
          Rivers
        </Link>
        <Link to="/signup" className="nav_link">
          Sign Up
        </Link>
        <Link to="/login" className="nav_link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
