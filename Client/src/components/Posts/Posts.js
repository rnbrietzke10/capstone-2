import { useState, useEffect } from 'react';
import PostForm from '../PostForm/PostForm';
import UserPost from '../UserPost/UserPost';

import './Posts.scss';
import Api from '../../ApiHelper';

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
      {posts.map(info => (
        <UserPost info={info} key={info.id} />
      ))}
    </div>
  );
};

export default Posts;
