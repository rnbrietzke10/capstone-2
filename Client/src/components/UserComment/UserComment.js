import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './UserComment.scss';

const UserComment = ({ info }) => {
  let profilePic =
    'https://images.pexels.com/photos/1838599/pexels-photo-1838599.jpeg?auto=compress&cs=tinysrgb&w=1600';
  let liked = false;
  const { username, content, postTime, img } = info;
  return (
    <div className='UserPost'>
      <div className='UserPost_container'>
        <div className='user'>
          <div className='userInfo'>
            <img src={profilePic} alt='' />
            <div className='details'>
              <Link
                to={`/profile/${username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{username}</span>
              </Link>
              <span className='date'>Posted: {postTime}</span>
            </div>
          </div>
        </div>
        <div className='content'>
          <img src={img} alt='' />
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
    </div>
  );
};

export default UserComment;
