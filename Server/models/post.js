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
            content
            )
           VALUES ($1, $2)
           RETURNING id`,
      [userId, content]
    );
    const postId = result.rows[0].id;

    if (img) {
      const addImageQuery = await db.query(`UPDATE posts
                        SET img = '${img}'
                        WHERE id = ${postId}
                        RETURNING id AS "postId",
                                  content,
                                  user_id AS "userId",
                                  img`);

      return addImageQuery;
    }

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
           JOIN users ON users.id = posts.user_id
           ORDER BY posts.id DESC`
    );

    return result.rows;
  }

  /** Update post
   *  This is a "partial update" --- it's fine if data doesn't contain all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { content, img, userId, postId}
   *
   * Returns { content, img if an image, postId, username}
   **/

  static async update(data, postId) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      content: 'content',
      img: 'img',
    });
    const postIdVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE posts
                      SET ${setCols}
                      WHERE post_id = ${postIdVarIdx}
                      RETURNING post_id,
                                content,
                                user_id,
                                img`;

    const results = await db.query(querySql, [...values, postId]);
    const post = results.rows[0];
    if (!post) throw new NotFoundError(`No post with id ${postId}`);

    return post;
  }

  /** create new comment on post
   *
   * Returns { comment_id, author, content, post_id }
   *
   **/

  static async createComment(content, userId, postId) {
    const result = await db.query(
      `INSERT INTO comments
           (user_id,
            content,
            post_id
            )
           VALUES ($1, $2, $3)
           RETURNING id AS "commentId", content, user_id AS "userId", post_id AS "postId"`,
      [userId, content, postId]
    );
    return result;
  }

  /** Get all comments on a post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async getComments(postId) {
    const result = await db.query(
      `SELECT username,
             content,
             comments.id,
             comments.created_at AS "commentTime",
             profile_img AS "profileImg"
             FROM comments
             JOIN users ON users.id = comments.user_id
             WHERE post_id = $1
             ORDER BY comments.id DESC`,
      [postId]
    );

    return result.rows;
  }

  /**
   * Like a post
   **/

  static async addLike(userId, id, idType) {
    const result = await db.query(
      `INSERT INTO likes
           (user_id,
            ${idType}_id
           )
           VALUES ($1, $2)
          `,
      [userId, id]
    );

    return result.rows;
  }

  /**
   * Get likes
   */

  static async getLikes(id, idType) {
    const result = await db.query(
      `SELECT user_id AS "userId"
       FROM likes
       WHERE ${idType}_id = $1`,
      [id]
    );

    return result;
  }
}

module.exports = Post;
