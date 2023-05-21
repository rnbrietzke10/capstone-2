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
   * Returns { post_id, author, content, page_posted  }
   *
   **/

  static async createPost(content, username, pagePostedOn) {
    const result = await db.query(
      `INSERT INTO posts
           (author,
            content,
            page_posted_on
            )
           VALUES ($1, $2, $3)
           RETURNING post_id AS "postID", content, author AS "username"`,
      [username, content, pagePostedOn]
    );
    return result;
  }

  /** Find all post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async findAll(pagePostedOn) {
    const result = await db.query(
      `SELECT author AS "username",
                  content,
                  post_id AS "postId"
           FROM posts
           WHERE page_posted_on = $1
           ORDER BY username`,
      [pagePostedOn]
    );

    return result.rows;
  }
}

module.exports = Post;
