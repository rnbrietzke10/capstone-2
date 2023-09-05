import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Api from '../../ApiHelper';
import { UserContext } from '../../contexts/UserContext';

const Likes = ({ data }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [numLikes, setNumLikes] = useState(likes.length);

  const token = localStorage.getItem('token');
  const { currentUser } = useContext(UserContext);

  const getLikesData = async () => {
    const resultsData = await Api.getLikes(data, token);

    setLikes(resultsData);

    if (resultsData.includes(currentUser.id)) setLike(true);
    setNumLikes(resultsData.length);
  };
  useEffect(() => {
    getLikesData();
  }, []);

  /**
   * Like
   */
  const handleLike = async () => {
    await Api.addLike(data, token);
    const updatedLikes = await getLikesData();

    if (updatedLikes.includes(currentUser.id)) setLike(true);
  };

  /**
   * unLike
   */
  const handleUnlike = async () => {
    await Api.unlike(data, currentUser.id, token);
    setLike(false);
    await getLikesData();
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
      {`${numLikes} Likes`}
    </div>
  );
};

export default Likes;
