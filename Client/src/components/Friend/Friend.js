import React from 'react';

import './Friend.scss';
const Friend = ({ friend }) => {
  return (
    <div className='user'>
      <img src={friend.profileImg} alt='<Username>' />
      <h4>{`${friend.firstName} ${friend.lastName}`}</h4>
    </div>
  );
};

export default Friend;
