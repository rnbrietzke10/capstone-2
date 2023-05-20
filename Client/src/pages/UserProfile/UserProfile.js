import RightMenu from '../../components/RightMenu/RightMenu';
import Posts from '../../components/Posts/Posts';
import './UserProfile.scss';

const UserProfile = () => {
  return (
    <div className='UserProfile_container'>
      <div className='profile_left'>
        <header>UserProfile header background image</header>
        <div className='user_post'>
          <Posts />
        </div>
      </div>
      <RightMenu />
    </div>
  );
};

export default UserProfile;
