import './RightMenu.scss';
import UsersList from '../UsersList/UsersList';

const RightMenu = () => {
  return (
    <div className='menu'>
      <h3>Suggested For You</h3>
      <UsersList />
    </div>
  );
};

export default RightMenu;
