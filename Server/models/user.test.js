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

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
const context = {};
/************************************** authenticate */
beforeEach(async () => {
  await db.query('DELETE FROM users');

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
});

describe('authenticate', function () {
  test('works', async function () {
    const user = await User.authenticate('u1', 'password1');
    expect(user).toEqual({
      username: 'u1',
      firstName: 'U1F',
      lastName: 'U1L',
      email: 'user1@user.com',
    });
  });

  test('unauth if no such user', async function () {
    try {
      await User.authenticate('nope', 'password');
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test('unauth if wrong password', async function () {
    try {
      await User.authenticate('c1', 'wrong');
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe('register', function () {
  const newUser = {
    username: 'new',
    firstName: 'Test',
    lastName: 'Tester',
    email: 'test@test.com',
  };

  test('should register new user', async function () {
    let user = await User.register({
      ...newUser,
      password: 'password',
    });
    expect(user).toEqual({ id: user.id, ...newUser });
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
  });

  test('should throw error with duplicate user data', async function () {
    try {
      await User.register({
        ...newUser,
        password: 'password',
      });
      await User.register({
        ...newUser,
        password: 'password',
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe('findAll()', function () {
  test('should return list of users', async function () {
    const otherUsers = [
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
    ];

    const users = await User.findAll('u1');

    expect(users).toEqual(otherUsers);
  });
});

/************************************** get */

describe('get(username)', function () {
  test('should return user with given username', async function () {
    let user = await User.get('u1');
    expect(user).toEqual({
      id: context.userA.id,
      username: 'u1',
      firstName: 'U1F',
      lastName: 'U1L',
      email: 'user1@user.com',
      profileImg: null,
      coverImg: null,
    });
  });

  test('should throw error if no such user', async function () {
    try {
      await User.get('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe('update(username, data)', function () {
  const updateData = {
    firstName: 'NewF',
    lastName: 'NewF',
    email: 'new@email.com',
    profileImg: 'img.jpeg',
    coverImg: 'img.png',
  };

  test('should update user data', async function () {
    let updatedUser = await User.update('u1', updateData);

    expect(updatedUser).toEqual({
      username: 'u1',
      firstName: 'NewF',
      lastName: 'NewF',
      email: 'new@email.com',
      profileImg: 'img.jpeg',
      coverImg: 'img.png',
      id: context.userA.id,
    });
    const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
  });

  test('should throw error if no user is found', async function () {
    try {
      await User.update('nope', {
        firstName: 'test',
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('should throw error if no data', async function () {
    expect.assertions(1);
    try {
      await User.update('c1', {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Delete User */

describe('delete user', function () {
  test('works', async function () {
    await User.deleteUser('u1');
    const res = await db.query("SELECT * FROM users WHERE username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test('not found if no such user', async function () {
    try {
      await User.deleteUser('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** Follow User */

describe('follow user', function () {
  test('should be follow user with given id', async function () {
    await User.follow(context.userA.id, context.userB.id);
  });
});

/************************************** Unfollow User */

describe('unfollow user', function () {
  test('should unfollow user with given ids', async function () {
    // Need to get ids for each user
    await User.follow(context.userA.id, context.userB.id);
    const res = await User.unfollow(context.userB.id, context.userA.id);
    expect(res).toBeTruthy();
  });
  test('unable to unfollow user ', async function () {
    try {
      await User.unfollow();
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Get following list */

describe('user following list', function () {
  test('get list of all users that are be followed by given user Id', async function () {
    // need userId
    await User.follow(context.userB.id, context.userA.id);
    const following = await User.getFollowingList(context.userB.id);
  });

  test('not found if no such user', async function () {
    try {
      await User.getFollowingList();
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
