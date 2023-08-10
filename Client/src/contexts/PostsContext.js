import { createContext, useState, useEffect } from 'react';
import Api from '../ApiHelper';

export const PostsContext = createContext({
  posts: null,
  setPosts: () => null,
});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await Api.getPosts();
      setPosts(data);
    };

    getPosts();
  }, []);
  const value = { posts, setPosts };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
