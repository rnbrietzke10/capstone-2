import React from 'react';
import './RightMenu.scss';

const RightMenu = () => {
  return (
    <div className="container">
      <div className="menu">
        <span>Suggested</span>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>User Name</h4>
        </div>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>User Name</h4>
        </div>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>User Name</h4>
        </div>
      </div>
      <div className="menu">
        <span>Friends</span>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>Friend User Name 1 </h4>
        </div>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>Friend User Name 2</h4>
        </div>
        <div className="user">
          <img src="" alt="<Username>" />
          <h4>Friend User Name 3</h4>
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
