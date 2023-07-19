'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForPartialUpdate } = require('../helpers/sql');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');

/** Related functions for post. */

class Post {
  /** create new post
   *
   * Returns { post_id, author, content  }
   *
   **/

  static async createPost(content, userId, img) {
    const result = await db.query(
      `INSERT INTO posts
           (user_id,
            content,
            img
            )
           VALUES ($1, $2, $3)
           RETURNING id, content, user_id AS "userId"`,
      [userId, content, img]
    );
    return result;
  }

  /** Find all post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  content,
                  posts.id,
                  img,
                  posts.created_at AS "postTime"
           FROM posts
           JOIN users ON users.id = posts.user_id`
    );

    return result.rows;
  }

  /** create new comment on post
   *
   * Returns { comment_id, author, content, post_id }
   *
   **/

  // static async createComment(content, username, postId) {
  //   const result = await db.query(
  //     `INSERT INTO posts
  //          (comment_author,
  //           content,
  //           comment_post_id
  //           )
  //          VALUES ($1, $2, $3, $4)
  //          RETURNING comment_id AS "commentId", content, comment_author AS "username", comment_post_id AS "postId"`,
  //     [username, content, postId]
  //   );
  //   return result;
  // }

  /**
   * Like a post
   **/

  static async likePost(userId, postId) {
    const result = await db.query(
      `INSERT INTO likes
           (user_id,
            post_id
           )
           VALUES ($1, $2)
          `,
      [userId, postId]
    );

    return result.rows;
  }
}

module.exports = Post;
