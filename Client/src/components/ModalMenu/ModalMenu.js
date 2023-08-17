import { useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../contexts/UserContext';
import { FollowingContext } from '../../contexts/FollowingContext';

import './ModalMenu.scss';
import Api from '../../ApiHelper';
import { PostsContext } from '../../contexts/PostsContext';

const ModalMenu = ({ setShowModal, data, setShowEditForm }) => {
  const modalRef = useRef(null);
  console.log('DATA Modal Menu:', data);
  const token = localStorage.getItem('token');
  const { currentUser } = useContext(UserContext);
  const { following, setFollowing } = useContext(FollowingContext);
  const { setPosts } = useContext(PostsContext);
  const handleClickOutside = e => {
    if (
      modalRef.current.contains(e.target) === null ||
      !modalRef.current.contains(e.target)
    ) {
      setShowModal(false);
    }
  };
  console.log('CURRENT  USER: ', currentUser);
  const handleDelete = async () => {
    if (data.type === 'posts') {
      await Api.deletePost(data, token);
    } else {
      await Api.deleteComment(data, token);
    }
  };
  const updateData = async () => {
    const followingList = await Api.getFollowingList(currentUser.id, token);
    setFollowing(followingList);
    const updatedPosts = await Api.getPosts();
    console.log(updatedPosts);
    setPosts(updatedPosts);
  };

  const handleFollow = async () => {
    const followingData = {
      followerId: currentUser.id,
      followedId: data.id,
    };
    await Api.follow(followingData, token);
    updateData();
  };

  const handleUnfollow = async () => {
    await Api.unfollow(data, token);
    updateData();
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, []);
  if (data.username === currentUser.username) {
    return (
      <>
        <div
          className='modal-container'
          ref={modalRef}
          onClick={() => setShowModal(false)}
        >
          <div className='close-modal'>
            <FontAwesomeIcon
              icon='fa-solid fa-xmark'
              className='close-modal-btn'
              size='xl'
            />
          </div>

          <div className='modal-menu-items-conatiner'>
            <div className='modal-menu-items delete' onClick={handleDelete}>
              <FontAwesomeIcon
                icon='fa-solid fa-trash-can'
                // style={{ color: '#000' }}
                size='xl'
              />
              <span>Delete</span>
            </div>
            <div
              className='modal-menu-items edit'
              onClick={() => setShowEditForm(true)}
            >
              <FontAwesomeIcon
                icon='fa-solid fa-pen-to-square'
                // style={{ color: '#000' }}
                size='xl'
              />
              <span>Edit</span>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className='modal-container '
        ref={modalRef}
        onClick={() => setShowModal(false)}
      >
        <div className='close-modal'>
          <FontAwesomeIcon
            icon='fa-solid fa-xmark'
            className='close-modal-btn'
            size='xl'
          />
        </div>

        <div className='modal-menu-items-conatiner'>
          {following.includes(data.userId) ? (
            <div className='modal-menu-items edit' onClick={handleUnfollow}>
              <span>Unfollow</span>
            </div>
          ) : (
            <div className='modal-menu-items edit' onClick={handleFollow}>
              <span>Follow</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalMenu;
