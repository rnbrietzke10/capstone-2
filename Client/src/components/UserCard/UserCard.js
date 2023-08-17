import { useState } from 'react';
import Api from '../../ApiHelper';

import './UserCard.scss';
const UserCard = ({ user }) => {
  const [btnInfo, setBtnInfo] = useState({
    className: 'follow',
    text: 'Follow',
  });
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const data = {
    currentUserId: currentUser.id,
    followingUserId: user.id,
  };
  const handleFollow = async () => {
    const result = await Api.addFriend(data, token);
    console.log(result);
    setBtnInfo({
      className: 'followed',
      text: '✔️',
    });
  };

  return (
    <div className='UserCard'>
      <img src={user.profileImg} alt='<Username>' />
      <h4>
        {user.firstName} <br />
        {user.lastName}
      </h4>
      <button onClick={handleFollow} className={btnInfo.className}>
        {btnInfo.text}
      </button>
    </div>
  );
};

export default UserCard;
