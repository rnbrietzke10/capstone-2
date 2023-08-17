import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';
import UserPost from '../UserPost/UserPost';

import './Posts.scss';
import { PostsContext } from '../../contexts/PostsContext';
import { FollowingContext } from '../../contexts/FollowingContext';
import { UserContext } from '../../contexts/UserContext';

const Posts = () => {
  const { currentUser } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const { following } = useContext(FollowingContext);
  const location = useLocation();
  const urlArr = location.pathname.split('/');
  let postLocation = urlArr[urlArr.length - 1];
  if (!postLocation) {
    postLocation = null;
  }

  return (
    <div className='Posts'>
      <PostForm />
      {posts.map(info => {
        console.log(info);
        if (following.includes(info.userId) || info.userId === currentUser.id) {
          if (postLocation !== null) {
            if (
              postLocation === info.postLocation ||
              info.username === postLocation
            ) {
              return <UserPost info={info} key={info.id} />;
            }
            return '';
          } else {
            return <UserPost info={info} key={info.id} />;
          }
        } else {
          return '';
        }
      })}
    </div>
  );
};

export default Posts;
