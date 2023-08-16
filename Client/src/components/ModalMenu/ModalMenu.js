import { useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../contexts/UserContext';
import './ModalMenu.scss';
import Api from '../../ApiHelper';

const ModalMenu = ({ setShowModal, data, setShowEditForm }) => {
  const modalRef = useRef(null);
  console.log('DATA Modal Menu:', data);
  const token = localStorage.getItem('token');
  const { currentUser } = useContext(UserContext);
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
          <div
            className='modal-menu-items edit'
            onClick={() => setShowEditForm(true)}
          >
            <span>Unfollow</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMenu;
