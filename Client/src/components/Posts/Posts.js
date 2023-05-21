import PostForm from '../PostForm/PostForm';
import UserPost from '../UserPost/UserPost';

import './Posts.scss';

const Posts = () => {
  const temp = [
    {
      postId: 1,
      author: 'John',
      content:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
      postTime: new Date('May 18, 2023 11:15:00'),
      img: null,
    },
    {
      postId: 2,
      author: 'John',
      content:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
      postTime: new Date('May 18, 2023 11:45:00'),
      img: 'https://images.pexels.com/photos/192454/pexels-photo-192454.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
  ];
  return (
    <div className='Posts'>
      <PostForm />
      {temp.map(info => (
        <UserPost info={info} key={info.postId} />
      ))}
    </div>
  );
};

export default Posts;
