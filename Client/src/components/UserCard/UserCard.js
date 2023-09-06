import { useContext } from 'react';
import Api from '../../ApiHelper';

import './UserCard.scss';
import { UserContext } from '../../contexts/UserContext';
const UserCard = ({ user, setFollowing }) => {
  const { currentUser } = useContext(UserContext);
  const token = localStorage.getItem('token');

  const data = {
    followerId: currentUser.id,
    followedId: user.id,
  };
  const handleFollow = async () => {
    const { username } = currentUser;
    data['currentUserUsername'] = username;
    await Api.follow(data, token);
    const followingList = await Api.getFollowingList(currentUser.id, token);
    setFollowing(followingList);
  };

  return (
    <div className='UserCard'>
      <div className='user-info'>
        <img src={user.profileImg} alt='<Username>' />
        <h4 className='user-name'>
          {user.firstName} <br />
          {user.lastName}
        </h4>
      </div>
      <button onClick={handleFollow} className='follow'>
        Follow
      </button>
    </div>
  );
};

export default UserCard;
