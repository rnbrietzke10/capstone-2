import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Api from '../../ApiHelper';
import { UserContext } from '../../contexts/UserContext';

const Likes = ({ data }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const token = localStorage.getItem('token');
  const { currentUser } = useContext(UserContext);
  // const { username } = user;
  // data['currentUserUsername'] = username;

  const getLikesData = async () => {
    const resultsData = await Api.getLikes(data, token);
    console.log(likes);
    setLikes(resultsData);
    if (resultsData.includes(currentUser.id)) setLike(true);
  };
  useEffect(() => {
    getLikesData();
  }, []);
  const handleLike = async () => {
    console.log('likes data sent', data);
    await Api.addLike(data, token);
    const updatedLikes = await getLikesData();

    if (updatedLikes.includes(currentUser.id)) setLike(true);
  };
  const handleUnlike = async () => {
    await Api.unlike(data, token);
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
