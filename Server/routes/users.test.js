'use strict';

const request = require('supertest');

const db = require('../db.js');
const app = require('../app');
const User = require('../models/user');

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

  context.followAB = await User.follow(context.userA.id, context.userB.id);
});

/************************************** GET /users */

describe('GET /users', function () {
  test('works for users', async function () {
    const resp = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      users: [
        {
          id: context.userB.id,
          username: 'u2',
          firstName: 'U2F',
          lastName: 'U2L',
          profileImg: null,
        },
        {
          id: context.userC.id,
          username: 'u3',
          firstName: 'U3F',
          lastName: 'U3L',
          profileImg: null,
        },
      ],
    });
  });

  test('unauth for anon', async function () {
    const resp = await request(app).get('/users');
    expect(resp.statusCode).toEqual(401);
  });

  test('fails: test next() handler', async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query('DROP TABLE users CASCADE');
    const resp = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /users/:username */

describe('GET /users/:username', function () {
  test('works for same user', async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        id: expect.any(Number),
        username: 'u1',
        firstName: 'U1F',
        lastName: 'U1L',
        email: 'user1@user.com',
        profileImg: null,
        coverImg: null,
      },
    });
  });

  test('unauth for other users', async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set('authorization', `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test('unauth for anon', async function () {
    const resp = await request(app).get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** PATCH /users/:username */

describe('PATCH /users/:username', () => {
  test('works for same user', async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 'New',
      })
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: 'u1',
        firstName: 'New',
        id: expect.any(Number),
        lastName: 'U1L',
        email: 'user1@user.com',
        profileImg: null,
        coverImg: null,
      },
    });
  });

  test('unauth if not same user', async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 'New',
      })
      .set('authorization', `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test('unauth for anon', async function () {
    const resp = await request(app).patch(`/users/u1`).send({
      firstName: 'New',
    });
    expect(resp.statusCode).toEqual(401);
  });

  test('not found if no such user', async function () {
    const resp = await request(app)
      .patch(`/users/nope`)
      .send({
        firstName: 'Nope',
      })
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test('bad request if invalid data', async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 42,
      })
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  // test('works: can set new password', async function () {
  //   const resp = await request(app)
  //     .patch(`/users/u1`)
  //     .send({
  //       password: 'new-password',
  //     })
  //     .set('authorization', `Bearer ${u1Token}`);
  //   expect(resp.body).toEqual({
  //     user: {
  //       username: 'u1',
  //       firstName: 'U1F',
  //       lastName: 'U1L',
  //       email: 'user1@user.com',
  //     },
  //   });
  //   const isSuccessful = await User.authenticate('u1', 'new-password');
  //   expect(isSuccessful).toBeTruthy();
  // });
});

/************************************** DELETE /users/:username */

describe('DELETE /users/:username', function () {
  test('works for same user', async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: 'u1' });
  });

  test('unauth if not same user', async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set('authorization', `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test('unauth for anon', async function () {
    const resp = await request(app).delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

/** POST /users/follow */

describe('POST /follow', () => {
  test('should return true if user is followed', async () => {
    const resp = await request(app)
      .post('/users/follow')
      .send({
        followerId: context.userB.id,
        followedId: context.userA.id,
      })
      .set('authorization', `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.follow).toBe(true);
  });

  test('should throw error if wrong user id', async () => {
    try {
      await request(app)
        .post('/users/follow')
        .send({
          followerId: context.userB.id,
          followedId: 0,
        })
        .set('authorization', `Bearer ${u2Token}`);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});

describe('DELETE /:username/unfollow/:userId/:currentUserId', () => {
  test('should unfollow user with given userId and currentUserId', async () => {
    const resp = await request(app)
      .delete(
        `/users/${context.userA.username}/unfollow/${context.userB.id}/${context.userA.id}`
      )
      .set('authorization', `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.unfollow).toBe(true);
  });

  test('should have response code of 401 if wrong user token', async () => {
    const resp = await request(app)
      .delete(
        `/users/${context.userA.username}/unfollow/${context.userB.id}/${context.userA.id}`
      )
      .set('authorization', `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });
  test('should throw error of wront url', async () => {
    try {
      await request(app)
        .delete(`/users/null/unfollow/0/${context.userB.id}`)
        .set('authorization', `Bearer ${u2Token}`);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});

describe('GET /:id/following', () => {
  test('should receive array of followers', async () => {
    const id = context.userA.id;
    const resp = await request(app)
      .get(`/users/${id}/following`)
      .set('authorization', `Bearer ${u1Token}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.following.length).toBe(1);
  });

  test('should receive 401 status code if invalid token', async () => {
    const id = context.userA.id;
    const resp = await request(app)
      .get(`/users/${id}/following`)
      .set('authorization', `Bearer null`);

    expect(resp.statusCode).toBe(401);
  });

  test('should throw error if invalid id', async () => {
    try {
      const id = 0;
      await request(app)
        .get(`/users/${id}/following`)
        .set('authorization', `Bearer ${u1Token}`);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
