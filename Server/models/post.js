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

  static async createPost(content, username, img) {
    const result = await db.query(
      `INSERT INTO posts
           (post_author,
            content,
            img
            )
           VALUES ($1, $2, $3, $4)
           RETURNING post_id AS "postId", content, post_author AS "username"`,
      [username, content, img]
    );
    return result;
  }

  /** Find all post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT post_author AS "username",
                  content,
                  post_id AS "postId",
                  img,
                  created_at AS "postTime"
           FROM posts`
    );

    return result.rows;
  }

  /** create new comment on post
   *
   * Returns { comment_id, author, content, post_id }
   *
   **/

  static async createComment(content, username, postId) {
    const result = await db.query(
      `INSERT INTO posts
           (comment_author,
            content,
            comment_post_id
            )
           VALUES ($1, $2, $3, $4)
           RETURNING comment_id AS "commentId", content, comment_author AS "username", comment_post_id AS "postId"`,
      [username, content, postId]
    );
    return result;
  }
}

module.exports = Post;
