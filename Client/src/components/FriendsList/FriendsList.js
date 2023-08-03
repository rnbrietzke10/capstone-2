import { useState, useEffect } from 'react';
import Api from '../../ApiHelper';
import Friend from '../Friend/Friend';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const getUsers = async () => {
      const result = await Api.getAllUsers(token);
      console.log(result);
      setFriends(result);
    };
    getUsers();
  }, []);
  return (
    <div>
      <ul>
        {friends.map(friend => (
          <Friend friend={friend} />
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
