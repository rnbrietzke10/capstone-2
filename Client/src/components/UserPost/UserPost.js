import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Likes from '../Likes/Likes';
import Comments from '../Comments/Comments';
import Api from '../../ApiHelper';
import './UserPost.scss';
import ModalMenu from '../ModalMenu/ModalMenu';
import { UserContext } from '../../contexts/UserContext';
import EditPostForm from '../EditPostForm/EditPostForm';
import { CommentsContext } from '../../contexts/CommentsContext';

const UserPost = ({ info }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const { firstName, lastName, username, content, postTime, profileImg, img } =
    info;
  const { currentUser } = useContext(UserContext);
  const { setComments } = useContext(CommentsContext);

  const [numComments, setNumComments] = useState(0);

  const getAllComments = async id => {
    const res = await Api.getComments(id);
    const updatedComments = {};
    updatedComments[id] = res;
    setComments(comments => ({ ...updatedComments, ...comments }));
    if (res !== undefined) setNumComments(res.length);
  };

  useEffect(() => {
    getAllComments(info.id);
  }, []);

  const postData = {
    currentUserUsername: currentUser.username,
    currentUserId: currentUser.id,
    type: 'posts',
    postUsername: username,
    content,
    img,
    postId: info.id,
    userId: info.userId,
  };

  const date = new Date(postTime.replace(' ', 'T'));
  return (
    <>
      <div className='UserPost'>
        <div className='UserPost_container'>
          <div className='UserPost_user'>
            <div className='userInfo'>
              <img src={profileImg} alt='' />
              <div className='details'>
                <Link
                  to={`/profile/${username}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className='name'>{`${firstName} ${lastName}`}</span>
                </Link>
                <span className='date'>
                  {` Posted:
                ${date.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}`}
                </span>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faEllipsis}
              size='xl'
              className='modal-menu-btn'
              onClick={() => setShowModal(!showModal)}
            />

            {showModal && (
              <ModalMenu
                setShowModal={setShowModal}
                data={postData}
                setShowEditForm={setShowEditForm}
              />
            )}
          </div>
          <div className='content'>
            {info.img ? <img src={info.img} alt='' /> : ''}
            <p>{content}</p>
          </div>
          <div className='info'>
            <Likes data={postData} />
            <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
              <FontAwesomeIcon icon={faCommentDots} />
              {numComments !== 1
                ? `${numComments} Comments`
                : `${numComments} Comment`}
            </div>
          </div>
          {commentOpen && <Comments postId={info.id} />}
        </div>
      </div>
      <EditPostForm
        show={showEditForm}
        onHide={() => setShowEditForm(false)}
        postData={{ currentUserUsername: currentUser.username, ...info }}
      />
    </>
  );
};

export default UserPost;
