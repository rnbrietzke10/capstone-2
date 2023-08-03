import './RightMenu.scss';
import FriendsList from '../FriendsList/FriendsList';

const RightMenu = () => {
  return (
    <div className='menu'>
      <h3>Suggested Friends</h3>
      <FriendsList />
    </div>
  );
};

export default RightMenu;
