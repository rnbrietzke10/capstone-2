import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ModalMenu.scss';
import Api from '../../ApiHelper';

const ModalMenu = ({ setShowModal, data }) => {
  const modalRef = useRef(null);
  const token = localStorage.getItem('token');
  const handleClickOutside = e => {
    if (!modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };
  console.log('Modal Data: ', data);
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
          <div className='modal-menu-items edit'>
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
};

export default ModalMenu;
