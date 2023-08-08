import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';
import UserPost from '../UserPost/UserPost';

import './Posts.scss';
import Api from '../../ApiHelper';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const urlArr = location.pathname.split('/');
  let postLocation = urlArr[urlArr.length - 1];
  if (!postLocation) {
    postLocation = null;
    console.log(typeof postLocation);
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await Api.getPosts();
      setPosts(data);
    };

    getPosts();
  }, []);
  return (
    <div className='Posts'>
      <PostForm />
      {posts.map(info => {
        console.log('Post Location: ', postLocation);
        if (postLocation !== null) {
          if (postLocation === info.postLocation) {
            return <UserPost info={info} key={info.id} />;
          }
          return '';
        } else {
          return <UserPost info={info} key={info.id} />;
        }
      })}
    </div>
  );
};

export default Posts;
