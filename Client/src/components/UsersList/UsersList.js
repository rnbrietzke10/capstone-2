import { useState, useEffect } from 'react';
import Api from '../../ApiHelper';
import UserCard from '../UserCard/UserCard';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log(currentUser);
  useEffect(() => {
    const getUsers = async () => {
      const result = await Api.getAllUsers(currentUser, token);
      console.log(result);

      setUsers(result);
    };
    getUsers();
  }, []);
  return (
    <div>
      <ul>
        {users.map(user => (
          <UserCard user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
