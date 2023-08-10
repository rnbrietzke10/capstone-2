import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';
import UserPost from '../UserPost/UserPost';

import './Posts.scss';
import { PostsContext } from '../../contexts/PostsContext';

const Posts = () => {
  const { posts } = useContext(PostsContext);
  const location = useLocation();
  const urlArr = location.pathname.split('/');
  let postLocation = urlArr[urlArr.length - 1];
  if (!postLocation) {
    postLocation = null;
    console.log(typeof postLocation);
  }

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
