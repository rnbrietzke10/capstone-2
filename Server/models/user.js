'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForPartialUpdate } = require('../helpers/sql');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');

const { BCRYPT_WORK_FACTOR } = require('../config.js');

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email,  }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError('Invalid username/password');
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email}
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email
            )
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
      [username, hashedPassword, firstName, lastName, email]
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email }, ...]
   **/

  static async findAll(username) {
    const result = await db.query(
      `SELECT id,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  profile_img AS "profileImg"
           FROM users
           WHERE username != $1`,
      [username]
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name }
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT
                  id,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  profile_img AS "profileImg",
                  cover_img AS "coverImg"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email}
   *
   * Returns { username, firstName, lastName, email}
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: 'first_name',
      lastName: 'last_name',
      profileImg: 'profile_img',
      coverImg: 'cover_img',
      userId: 'id',
    });
    const usernameVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE username = ${usernameVarIdx}
                      RETURNING username,
                                id,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                profile_img AS "profileImg",
                                cover_img AS "coverImg",
                                email`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async deleteUser(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Follow user */
  static async follow(followerId, followedId) {
    let result = await db.query(
      `INSERT INTO followers
        (follower_id, followed_id )
        VALUES ($1,$2)`,
      [followerId, followedId]
    );
  }

  /** Delete follow relationship from database; returns undefined. */

  static async unfollow(followedId, followerId) {
    let result = await db.query(
      `DELETE
           FROM followers
           WHERE followed_id = $1 AND follower_id =$2`,
      [followedId, followerId]
    );
  }

  /** Get following list */
  static async getFollowingList(id) {
    let result = await db.query(
      `SELECT followed_id
                                  FROM followers
                                  WHERE follower_id = $1 `,
      [id]
    );
    return result.rows;
  }
}

module.exports = User;
