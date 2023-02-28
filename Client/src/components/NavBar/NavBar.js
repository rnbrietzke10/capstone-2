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
      <div></div>
    </div>
  );
};

export default NavBar;
