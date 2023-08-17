import { createContext, useState, useEffect, useContext } from 'react';
import Api from '../ApiHelper';
import { UserContext } from './UserContext';

export const FollowingContext = createContext({
  following: null,
  setFollowing: () => null,
});

export const FollowingProvider = ({ children }) => {
  const [following, setFollowing] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getFollowing = async () => {
      const token = await localStorage.getItem('token');

      const list = await Api.getFollowingList(currentUser.id, token);
      console.log('LIST: ', list);
      setFollowing(list);
    };
    getFollowing();
  }, []);

  const value = { following, setFollowing };
  return (
    <FollowingContext.Provider value={value}>
      {children}
    </FollowingContext.Provider>
  );
};
