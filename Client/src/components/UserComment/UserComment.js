import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './UserComment.scss';

const UserComment = ({ info }) => {
  let liked = false;
  const { username, content, commentTime } = info;
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
        <div className='item'>
          {liked ? (
            <FontAwesomeIcon icon={faHeart} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
          12 Likes
        </div>
      </div>
    </div>
  );
};

export default UserComment;
