import { Link } from 'react-router-dom';
import Likes from '../Likes/Likes';

import './UserComment.scss';

const UserComment = ({ info, postId }) => {
  const { username, content, commentTime } = info;
  const user = JSON.parse(localStorage.getItem('user'));
  const data = {
    userId: user.id,
    commentId: info.id,
    type: 'comments',
    postId: postId,
  };
  return (
    <div className='UserComment_container'>
      <div className='user'>
        <div className='userInfo'>
          <img src={info.profileImg} alt={username} />
          <div className='details'>
            <Link
              to={`/profile/${username}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <span className='name'>{username}</span>
            </Link>
            <span className='date'>Posted: {commentTime}</span>
          </div>
        </div>
      </div>
      <div className='content'>
        <p>{content}</p>
      </div>
      <div className='info'>
        <Likes data={data} />
      </div>
    </div>
  );
};

export default UserComment;
