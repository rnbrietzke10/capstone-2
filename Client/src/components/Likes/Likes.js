import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Api from '../../ApiHelper';

const Likes = ({ data }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem('token');

  const getLikesData = async () => {
    const resultsData = await Api.getLikes(data, token);

    setLikes(resultsData);
    if (resultsData.includes(data.userId)) setLike(true);
  };
  useEffect(() => {
    getLikesData();
  }, []);
  const handleLike = async () => {
    await Api.addLike(data, token);
    const updatedLikes = await getLikesData();

    if (updatedLikes.includes(data.userId)) setLike(true);
  };
  const handleUnlike = async () => {
    setLike(false);
  };
  return (
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
      {`${likes.length} Likes`}
    </div>
  );
};

export default Likes;
