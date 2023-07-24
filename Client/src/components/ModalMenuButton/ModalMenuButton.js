import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import './ModalMenuButton.scss';

const ModalMenuButton = () => {
  return (
    <div className='ellipsis-container'>
      <FontAwesomeIcon icon={faEllipsis} size='xl' className='ellipsis' />
    </div>
  );
};

export default ModalMenuButton;
