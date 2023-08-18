import { createContext, useState } from 'react';

export const CommentsContext = createContext({
  comments: null,
  setComments: () => null,
});

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});
  const value = { comments, setComments };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
