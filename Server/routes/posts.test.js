'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app');
const User = require('../models/user');
const Post = require('../models/post');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
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

describe('POST /posts/new', () => {
  test('should return post that was created', async () => {
    const resp = await request(app)
      .post('/posts/new')
      .send({
        content: 'new post',
        userId: context.userA.id,
        postLocation: null,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.body.post).toEqual({
      postId: expect.any(Number),
      content: 'new post',
      userId: context.userA.id,
    });
  });

  test('should throw error if no data sent', async () => {
    try {
      const resp = await request(app)
        .post('/posts/new')
        .send()
        .set('authorization', `Bearer ${u1Token}`);
    } catch (err) {
      expect(resp.statusCode).toBe(400);
      expect(err).toThrow();
    }
  });
});

describe('GET /posts', () => {
  test('should return list of all posts', async () => {
    const resp = await request(app).get('/posts');

    expect(resp.body.posts.length).toBe(2);
  });
});

describe('PATCH /posts/:postId/update', () => {
  test('should update post with corresponding id', async () => {
    const resp = await request(app)
      .patch(`/posts/${context.postA1.postId}/update`)
      .send({
        content: 'update post',
        img: 'img.png',
        currentUserUsername: context.userA.username,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.post).toEqual({
      content: 'update post',
      img: 'img.png',
      postId: context.postA1.postId,
      userId: context.userA.id,
      postLocation: null,
    });
  });

  test('should throw error if invalid token', async () => {
    try {
      const resp = await request(app)
        .patch(`/posts/${context.postA1.postId}/update`)
        .send({
          content: 'update post',
          img: 'img.png',
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer 0`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if no data sent', async () => {
    try {
      const resp = await request(app)
        .patch(`/posts/${context.postA1.postId}/update`)
        .send({
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(500);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if unable to verify correct user', async () => {
    try {
      const resp = await request(app)
        .patch(`/posts/${context.postA1.postId}/update`)
        .send({
          content: 'update post',
          img: 'img.png',
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('DELETE /posts/:postId/delete', () => {
  test('should delete post with corresponding id', async () => {
    const id = context.postA1.postId;
    const resp = await request(app)
      .delete(`/posts/${id}/delete`)
      .send({
        currentUserUsername: context.userA.username,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(+resp.body.deleted).toBe(id);
  });

  test('should throw error if invalid post id', async () => {
    try {
      const id = 0;
      const resp = await request(app)
        .delete(`/posts/${id}/delete`)
        .send({
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(404);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if unable to validate correct user', async () => {
    try {
      const id = context.postA1.postId;
      const resp = await request(app)
        .delete(`/posts/${id}/delete`)
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('POST /posts/:id/comments/new', () => {
  test('should return comment if successfully created', async () => {
    const id = context.postA1.postId;
    const resp = await request(app)
      .post(`/posts/${id}/comments/new`)
      .send({
        content: 'new comment',
        userId: context.userA.id,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.comment).toEqual({
      content: 'new comment',
      userId: context.userA.id,
      postId: id,
      commentId: expect.any(Number),
    });
  });
  test('should throw error if invalid post id', async () => {
    try {
      const id = 0;
      const resp = await request(app)
        .post(`/posts/${id}/comments/new`)
        .send({
          content: 'new comment',
          userId: context.userA.id,
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(500);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if invalid token', async () => {
    try {
      const id = context.postA1.postId;
      const resp = await request(app)
        .post(`/posts/${id}/comments/new`)
        .set('authorization', `Bearer `);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('PATCH /posts/:postId/comments/:commentId/update', () => {
  test('should update comment with with corresponding postId and commentId', async () => {
    const postId = context.postA1.postId;
    const commentId = context.commentA1.commentId;
    const updatedComment = {
      content: 'update comment',
      currentUserUsername: context.userA.username,
    };
    const resp = await request(app)
      .patch(`/posts/${postId}/comments/${commentId}/update`)
      .send(updatedComment)
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.comment).toEqual({
      content: 'update comment',
      commentId,
      userId: context.userA.id,
    });
  });

  test('should throw error if invalid token', async () => {
    try {
      const postId = context.postA1.postId;
      const commentId = context.commentA1.commentId;
      const resp = await request(app)
        .patch(`/posts/${postId}/comments/${commentId}/update`)
        .send({
          content: 'update post',
          img: 'img.png',
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer 0`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if no data sent', async () => {
    try {
      const postId = context.postA1.postId;
      const commentId = context.commentA1.commentId;
      const resp = await request(app)
        .patch(`/posts/${postId}/comments/${commentId}/update`)
        .send({
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(500);
    } catch (err) {
      expect(err).toThrow();
    }
  });

  test('should throw error if unable to verify correct user', async () => {
    try {
      const postId = context.postA1.postId;
      const commentId = context.commentA1.commentId;
      const resp = await request(app)
        .patch(`/posts/${postId}/comments/${commentId}/update`)
        .send({
          content: 'update post',
        })
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('GET /posts/:postId/comments', () => {
  test('should get array of comments for given post id', async () => {
    const postId = context.postA1.postId;
    const resp = await request(app).get(`/posts/${postId}/comments`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.comments.length).toBe(1);
  });
});

describe('DELETE /:postId/comments/:commentId/delete', () => {
  test('should delete comment', async () => {
    const postId = context.postA1.postId;
    const commentId = context.commentA1.commentId;
    const resp = await request(app)
      .delete(`/posts/${postId}/comments/${commentId}/delete`)
      .send({
        currentUserUsername: context.userA.username,
      })
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.statusCode).toBe(200);
    expect(+resp.body.deleted).toBe(commentId);
  });
  test('should throw error if commentId does not exist', async () => {
    try {
      const postId = context.postA1.postId;
      const commentId = 0;
      const resp = await request(app)
        .delete(`/posts/${postId}/comments/${commentId}/delete`)
        .send({
          currentUserUsername: context.userA.username,
        })
        .set('authorization', `Bearer ${u1Token}`);
      expect(resp.statusCode).toBe(404);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('POST /:id/like', () => {
  test('should return true if success post', async () => {
    const userId = context.userB.id;
    const postId = context.postA1.postId;
    const resp = await request(app)
      .post(`/posts/${postId}/like`)
      .send({
        currentUserId: userId,
      })
      .set('authorization', `Bearer ${u2Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.liked).toBe(true);
  });
  test('should throw error if invalid token', async () => {
    try {
      const postId = context.postA1.postId;
      const resp = await request(app).post(`/posts/${postId}/like`).send({});

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('GET /:postid/likes', () => {
  test('should return an array of ids of users that liked the post', async () => {
    const postId = context.postA1.postId;
    const resp = await request(app)
      .get(`/posts/${postId}/likes`)
      .set('authorization', `Bearer ${u2Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.likes.length).toBe(1);
  });
});

describe('DELETE /:postid/like/:userId', () => {
  test('should delete like with mathcing post id and user id', async () => {
    const userId = context.userA.id;
    const postId = context.postA1.postId;

    const resp = await request(app)
      .delete(`/posts/${postId}/like/${userId}`)
      .send({
        currentUserUsername: context.userA.username,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);

    expect(resp.body.result.id).toBe(context.likeAP.id);
  });
});

describe('POST /:postId/comments/:commentId/like', () => {
  test('should return true if success', async () => {
    const userId = context.userB.id;
    const postId = context.postA1.postId;
    const commentId = context.commentA1.commentId;
    const resp = await request(app)
      .post(`/posts/${postId}/comments/${commentId}/like`)
      .send({
        currentUserId: userId,
      })
      .set('authorization', `Bearer ${u2Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.liked).toBe(true);
  });
  test('should throw error if invalid user', async () => {
    try {
      const userId = context.userB.id;
      const postId = context.postA1.postId;
      const commentId = context.commentA1.commentId;
      const resp = await request(app)
        .post(`/posts/${postId}/comments/${commentId}/like`)
        .set('authorization', `Bearer null`);

      expect(resp.statusCode).toBe(401);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});

describe('DELETE /:postId/comments/:commentId/like/:userId', () => {
  test('', async () => {
    const userId = context.userA.id;
    const postId = context.postA1.postId;
    const commentId = context.commentA1.commentId;

    const resp = await request(app)
      .delete(`/posts/${postId}/comments/${commentId}/like/${userId}`)
      .send({
        currentUserUsername: context.userA.username,
      })
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);

    expect(resp.body.deleted).toBe(context.likeAC.id);
  });
});

describe('GET /:postid/comments/:commentId/likes', () => {
  test('should return array of ids for users who liked comment', async () => {
    const commentId = context.commentA1.commentId;
    const postId = context.postA1.postId;

    const resp = await request(app)
      .get(`/posts/${postId}/comments/${commentId}/likes`)
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.likes.length).toBe(1);
  });

  test('should throw error if not valid comment id', async () => {
    try {
      const commentId = null;
      const postId = context.postA1.postId;

      const resp = await request(app)
        .get(`/posts/${postId}/comments/${commentId}/likes`)
        .set('authorization', `Bearer ${u1Token}`);

      expect(resp.statusCode).toBe(500);
    } catch (err) {
      expect(err).toThrow();
    }
  });
});
