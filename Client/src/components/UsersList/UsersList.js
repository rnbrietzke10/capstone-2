import { useState, useEffect, useContext } from 'react';

import Api from '../../ApiHelper';
import UserCard from '../UserCard/UserCard';
import { FollowingContext } from '../../contexts/FollowingContext';
import './UsersList.scss';
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const { following, setFollowing } = useContext(FollowingContext);

  useEffect(() => {
    const getUsers = async () => {
      const result = await Api.getAllUsers(token);

      setUsers(result);
    };
    getUsers();
  }, []);

  let usersNotFollowed = [];
  users.forEach(user => {
    const { id } = user;
    if (following.indexOf(id) === -1) {
      usersNotFollowed.push(user);
    }
  });
  let suggestedUsers = [];

  let randNum;
  if (usersNotFollowed) {
    for (let i = 0; i < usersNotFollowed.length; i++) {
      randNum = Math.floor(Math.random() * usersNotFollowed.length);
      if (suggestedUsers.indexOf(usersNotFollowed[randNum]) === -1) {
        suggestedUsers.push(usersNotFollowed[randNum]);
      }
      if (suggestedUsers.length === 3) break;
    }
  }

  return (
    <ul className='user-list' style={{ paddingLeft: 0 }}>
      {suggestedUsers.map(user => (
        <UserCard user={user} setFollowing={setFollowing} />
      ))}
    </ul>
  );
};

export default UsersList;
