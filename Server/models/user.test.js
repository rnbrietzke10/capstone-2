'use strict';

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');
const db = require('../db.js');
const User = require('./user.js');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe('authenticate', function () {
  test('works', async function () {
    const user = await User.authenticate('u1', 'password1');
    user.id = 1;
    expect(user).toEqual({
      id: 1,
      username: 'u1',
      firstName: 'U1F',
      lastName: 'U1L',
      email: 'u1@email.com',
      // profileImg: 'img.jpeg',
      // coverImg: 'img.png',
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

  test('works', async function () {
    let user = await User.register({
      ...newUser,
      password: 'password',
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
  });

  test('bad request with dup data', async function () {
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

describe('findAll', function () {
  test('works', async function () {
    const users = await User.findAll('u1');

    users.forEach(user => delete user.id);

    expect(users).toEqual([
      {
        username: 'u2',
        firstName: 'U2F',
        lastName: 'U2L',
        profileImg: 'img.jpeg',
      },
    ]);
  });
});

/************************************** get */

describe('get', function () {
  test('works', async function () {
    let user = await User.get('u1');
    user.id = 1;
    expect(user).toEqual({
      id: 1,
      username: 'u1',
      firstName: 'U1F',
      lastName: 'U1L',
      email: 'u1@email.com',
      profileImg: 'img.jpeg',
      coverImg: 'img.png',
    });
  });

  test('not found if no such user', async function () {
    try {
      await User.get('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe('update', function () {
  const updateData = {
    firstName: 'NewF',
    lastName: 'NewF',
    email: 'new@email.com',
  };

  test('works: update user data', async function () {
    let updatedUser = await User.update('u1', updateData);
    updatedUser.id = 1;
    expect(updatedUser).toEqual({
      username: 'u1',
      firstName: 'NewF',
      lastName: 'NewF',
      email: 'new@email.com',
      profileImg: 'img.jpeg',
      coverImg: 'img.png',
      id: 1,
    });
    const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
  });

  test('not found if no such user', async function () {
    try {
      await User.update('nope', {
        firstName: 'test',
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test('bad request if no data', async function () {
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
  test('works', async function () {
    // Need to get ids for each user
    await await User.follow();
  });
  test('unable to follow user does not exist', async function () {
    try {
      await User.follow();
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** Unfollow User */

describe('follow user', function () {
  test('works', async function () {
    // Need to get ids for each user
    await await User.unfollow();
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
    const following = await User.getFollowingList();
  });

  test('not found if no such user', async function () {
    try {
      await User.getFollowingList('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
