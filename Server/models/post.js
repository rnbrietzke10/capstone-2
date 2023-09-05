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

  static async createPost({ content, userId, postLocation, img }) {
    const result = await db.query(
      `INSERT INTO posts
           (user_id,
            content,
            post_location
            )
           VALUES ($1, $2, $3)
           RETURNING id AS "postId",
                                  content,
                                  user_id AS "userId"`,
      [userId, content, postLocation]
    );

    const postId = result.rows[0].postId;

    if (img) {
      const addImageQuery = await db.query(
        `UPDATE posts
                        SET img = $1
                        WHERE id = $2
                        RETURNING id AS "postId",
                                  content,
                                  user_id AS "userId",
                                  post_location AS "postLocation",
                                  img`,
        [img, postId]
      );

      return addImageQuery.rows[0];
    }

    return result.rows[0];
  }

  /** Find all post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  users.id AS "userId",
                  content,
                  posts.id,
                  img,
                  posts.created_at AS "postTime",
                   post_location AS "postLocation",
                   profile_img AS "profileImg"
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

  static async updatePost(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      content: 'content',
      img: 'img',
    });
    const postIdVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE posts
                      SET ${setCols}
                      WHERE id = ${postIdVarIdx}
                      RETURNING id AS "postId",
                                content,
                                user_id AS "userId",
                                post_location AS "postLocation",
                                img`;

    const results = await db.query(querySql, [...values, id]);
    const post = results.rows[0];
    if (!post) throw new NotFoundError(`No post with id ${id}`);

    return post;
  }

  /** DELETE post with given id
   *
   * Returns {id }
   *
   **/

  static async deletePost(id) {
    const result = await db.query(
      `DELETE
           FROM posts
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    if (!result.rows[0]) throw new NotFoundError(`Post with ${id} not found.`);

    return result.rows[0];
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
    return result.rows[0];
  }

  /** Update post
   *  This is a "partial update" --- it's fine if data doesn't contain all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { content, img, userId, postId}
   *
   * Returns { content, img if an image, postId, username}
   **/

  static async updateComment(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      content: 'content',
    });
    const commentIdVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE comments
                      SET ${setCols}
                      WHERE id = ${commentIdVarIdx}
                      RETURNING id AS "commentId",
                                content,
                                user_id AS "userId"`;

    const results = await db.query(querySql, [...values, id]);
    const comment = results.rows[0];

    if (!comment)
      throw new NotFoundError(`Unable to update comment with id ${id}`);

    return comment;
  }

  /** Get all comments on a post.
   *
   * Returns [{ username, content, post_id}, ...]
   **/

  static async getComments(postId) {
    const result = await db.query(
      `SELECT username,
              users.id AS "userId",
              first_name AS "firstName",
              last_name AS "lastName",
               post_id AS "postId",
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

  /** DELETE post with given id
   *
   * Returns {id }
   *
   **/

  static async deleteComment(id) {
    const result = await db.query(
      `DELETE
           FROM comments
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    if (!result.rows[0]) throw new NotFoundError(`Like not found.`);

    return result.rows[0];
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
          RETURNING id`,
      [userId, id]
    );

    return result.rows[0];
  }

  /**
   * unlike a post
   **/

  static async unlike(id, idType, userId) {
    const result = await db.query(
      `DELETE
           FROM likes
           WHERE ${idType}_id = $1 AND user_id = $2
           RETURNING id`,
      [id, userId]
    );
    if (!result.rows[0]) throw new NotFoundError(`Like not found.`);

    return result.rows[0];
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
    return result.rows;
  }
}

module.exports = Post;
