import { useState, useEffect, useContext } from 'react';
import Api from '../../ApiHelper';
import UserCard from '../UserCard/UserCard';
import { FollowingContext } from '../../contexts/FollowingContext';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const { following, setFollowing } = useContext(FollowingContext);

  useEffect(() => {
    const getUsers = async () => {
      const result = await Api.getAllUsers(token);
      console.log(result);

      setUsers(result);
    };
    getUsers();
  }, []);
  return (
    <div>
      <ul>
        {users.map(user => {
          const { id } = user;
          if (following.indexOf(id) === -1) {
            return <UserCard user={user} />;
          } else return '';
        })}
      </ul>
    </div>
  );
};

export default UsersList;
