'use strict';

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');
const db = require('../db.js');
const User = require('./user.js');
const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');
const Post = require('./post');

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
const context = {};

beforeEach(async () => {
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM comments');
  context.userA = await User.register({
    username: 'u1',
    firstName: 'U1F',
    lastName: 'U1L',
    email: 'user1@user.com',
    password: 'password1',
  });

  context.userB = await User.register({
    username: 'u2',
    firstName: 'U2F',
    lastName: 'U2L',
    email: 'user2@user.com',
    password: 'password2',
  });
  context.userC = await User.register({
    username: 'u3',
    firstName: 'U3F',
    lastName: 'U3L',
    email: 'user3@user.com',
    password: 'password3',
  });
  context.postA1 = await Post.createPost({
    content: 'content1',
    userId: context.userA.id,
    postLocation: null,
  });

  context.postB1 = await Post.createPost({
    content: 'content1',
    userId: context.userB.id,
    postLocation: null,
  });

  context.commentA1 = await Post.createComment(
    'comment1',
    context.userA.id,
    context.postA1.postId
  );
  context.likeAP = await Post.addLike(
    context.userA.id,
    context.postA1.postId,
    'post'
  );

  context.likeAC = await Post.addLike(
    context.userA.id,
    context.commentA1.commentId,
    'comment'
  );
});

describe('createPost(content, userId, postLocation, img)', () => {
  test('should create new post', async () => {
    const post = {
      content: 'here is my post',
      userId: context.userA.id,
    };

    const res = await Post.createPost(post);
    expect(res).toEqual({ postId: expect.any(Number), ...post });
  });

  test('should create post if image is given', async () => {
    const post = {
      content: 'here is my post with an image',
      userId: context.userA.id,
      postLocation: null,
      img: 'image.jpeg',
    };

    const res = await Post.createPost(post);
    expect(res).toEqual({ postId: expect.any(Number), ...post });
  });
});

describe('findAll()', () => {
  test('should find list of all posts', async () => {
    const posts = [context.postA1, context.postB1];

    const result = await Post.findAll();
    expect(result.length).toBe(2);
  });
});

describe('updatePost()', () => {
  test('should update post with given id', async () => {
    const updatedPost = { content: 'updated content1', img: 'img.jpeg' };
    const postInfo = {
      content: 'updated content1',
      img: 'img.jpeg',
      postId: context.postA1.postId,
      postLocation: null,
      userId: context.postA1.userId,
    };
    const result = await Post.updatePost(context.postA1.postId, updatedPost);

    expect(result).toEqual(postInfo);
  });
  test('should throw error if post does not exist', async function () {
    try {
      await Post.updatePost(0, {
        content: 'updated content1',
        img: 'img.jpeg',
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('deletePost()', () => {
  test('should delete post with given id', async () => {
    const result = await Post.deletePost(context.postA1.postId);

    expect(result.id).toBe(context.postA1.postId);
  });

  test('should throw error if post does not exist', async function () {
    try {
      await Post.deletePost(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('createComment()', () => {
  test('should create comment for given post id', async () => {
    const content = 'comment1';
    const result = await Post.createComment(
      content,
      context.userA.id,
      context.postA1.postId
    );

    expect(result).toEqual({
      commentId: expect.any(Number),
      content: content,
      userId: context.userA.id,
      postId: context.postA1.postId,
    });
  });
});

describe('updateComment()', () => {
  test('should update comment if given valid comment id', async () => {
    const newComment = { content: 'new comment 1' };

    const result = await Post.updateComment(
      context.commentA1.commentId,
      newComment
    );

    expect(result).toEqual({
      commentId: context.commentA1.commentId,
      userId: context.userA.id,
      ...newComment,
    });
  });
  test('should throw error if comment with given id not found', async () => {
    try {
      await Post.updateComment(0, { content: 'new comment' });
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('getComments(postId)', () => {
  test('should return list of all comments linked to given postId', async () => {
    const result = await Post.getComments(context.postA1.postId);

    expect(result.length).toBe(1);
  });
});

describe('deleteComment(id)', () => {
  test('should delete comment associated with given id', async () => {
    const result = await Post.deleteComment(context.commentA1.commentId);

    expect(result.id).toBe(context.commentA1.commentId);
  });

  test('should throw error if comment not found with given id', async () => {
    try {
      await Post.deleteComment(0);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('addLike(userId, id, idType)', () => {
  test('should add like to post or comment', async () => {
    const resultPost = await Post.addLike(
      context.userB.id,
      context.postA1.postId,
      'post'
    );

    const resultComment = await Post.addLike(
      context.userB.id,
      context.commentA1.commentId,
      'comment'
    );

    expect(resultPost.id).toBeDefined();
    expect(resultComment.id).toBeDefined();
  });
});

describe('unlike(id,idType, usersId)', () => {
  test('unlike post or comment if id and user id matches', async () => {
    const result = await Post.unlike(
      context.postA1.postId,
      'post',
      context.userA.id
    );

    expect(result.id).toBe(context.likeAP.id);
  });

  test('should throw error if like not found with given post/comment id and userId', async () => {
    try {
      await Post.unlike(0, 'post', context.userA.id);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe('getLikes(id, idType)', () => {
  test('should return array of userIds (likes) for given post or comment id', async () => {
    const resultP = await Post.getLikes(context.postA1.postId, 'post');
    const resultC = await Post.getLikes(context.commentA1.commentId, 'comment');

    expect(resultP.length).toBe(1);
    expect(resultC.length).toBe(1);
  });
});
