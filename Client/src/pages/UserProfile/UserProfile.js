import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import RightMenu from '../../components/RightMenu/RightMenu';
import Posts from '../../components/Posts/Posts';
import './UserProfile.scss';

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className='UserProfile_container'>
      <header>
        <img className='cover-img' src={currentUser.coverImg} alt='' />
      </header>

      <div className='profile'>
        <div className='profile_left'>
          <Posts />
        </div>
        <RightMenu />
      </div>
    </div>
  );
};

export default UserProfile;
