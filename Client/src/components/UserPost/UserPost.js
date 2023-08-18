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

const UserPost = ({ info }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const { firstName, lastName, username, content, postTime, profileImg, img } =
    info;
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getAllComments = async () => {
      const res = await Api.getComments(info.id);

      setComments(res);
    };

    getAllComments();
  }, []);

  const postData = {
    currentUserUsername: currentUser.username,
    currentUserId: currentUser.id,
    type: 'posts',
    content,
    img,
    postId: info.id,
    userId: info.id,
  };

  const data = {
    currentUserUsername: currentUser.username,
    postUsername: username,
    type: 'posts',
    content,
    img,
    postId: info.id,
    userId: info.id,
  };
  console.log('POSTS DATA', data);

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
                data={data}
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
              {comments.length !== 1
                ? `${comments.length} Comments`
                : `${comments.length} Comment`}
            </div>
          </div>
          {commentOpen && <Comments comments={comments} postId={info.id} />}
        </div>
      </div>
      <EditPostForm
        show={showEditForm}
        onHide={() => setShowEditForm(false)}
        postData={info}
      />
    </>
  );
};

export default UserPost;
