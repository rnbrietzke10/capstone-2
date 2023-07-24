import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  // Future addition ⬇️
  // faShareFromSquare,
} from '@fortawesome/free-solid-svg-icons';

import Comments from '../Comments/Comments';
import Api from '../../ApiHelper';
import './UserPost.scss';
import ModalMenuButton from '../ModalMenuButton/ModalMenuButton';

const UserPost = ({ info }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(false);
  const { profileImg, id } = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const data = {
    userId: id,
    postId: info.id,
  };

  const handleLike = async () => {
    await Api.addLike(data, 'posts', token);
    setLike(true);
  };
  const handleUnlike = async () => {
    setLike(false);
  };
  const { username, content, postTime } = info;
  console.log(info.id);

  return (
    <div className='UserPost'>
      <div className='UserPost_container'>
        <div className='user'>
          <div className='userInfo'>
            <img src={profileImg} alt='' />
            <div className='details'>
              <Link
                to={`/profile/${username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{username}</span>
              </Link>
              <span className='date'>Posted {postTime}</span>
            </div>
          </div>
          <ModalMenuButton className='modal-menu-btn' />
        </div>
        <div className='content'>
          {info.img ? <img src={info.img} alt='' /> : ''}
          <p>{content}</p>
        </div>
        <div className='info'>
          <div className='item'>
            {like ? (
              <FontAwesomeIcon
                icon='fa-solid fa-heart'
                style={{ color: '#e00000' }}
                onClick={handleUnlike}
              />
            ) : (
              <FontAwesomeIcon
                icon='fa-regular fa-heart'
                style={{ color: '#e00000' }}
                onClick={handleLike}
              />
            )}
            12 Likes
          </div>
          <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
            <FontAwesomeIcon icon={faCommentDots} />
            12 Comments
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default UserPost;

/* ⬇️ Future addition ⬇️  Will go next to comments and likes in post*/
/* <div className='item'>
            <FontAwesomeIcon icon={faShareFromSquare} />
            Share
          </div> */
