import RightMenu from '../../components/RightMenu/RightMenu';
import Posts from '../../components/Posts/Posts';
import './UserProfile.scss';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='UserProfile_container'>
      <header>
        <img className='cover-img' src={user.coverImg} alt='' />
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
