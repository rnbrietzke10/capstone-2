'use strict';

/** Routes for posts. */

// const jsonschema = require('jsonschema');

const express = require('express');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const Post = require('../models/post');

const router = express.Router();

/** POST /posts/new
 *
 * Returns {post content, username, postId}
 *
 * Authorization required: none
 */

router.post('/new', ensureLoggedIn, async function (req, res, next) {
  try {
    const { content, userId, img } = req.body;
    const post = await Post.createPost(content, userId, img);

    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/**
 * Get all posts
 *
 */

router.get('/', async function (req, res, next) {
  const posts = await Post.findAll();
  return res.json({ posts });
});

/** PATCH /[postId]
 *
 * Data can include:
 *   { content, img, userId, postId}
 *
 * Returns { content, img, postId, username}
 *
 * Authorization required: same-user-as-userId on post
 **/

router.patch(':postId', ensureCorrectUser, async function (req, res, next) {
  try {
    const post = await Post.update(req.params.postId, req.body);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** POST /posts/:id/comments/new
 *
 * Returns {post content, username, postId}
 *
 * Authorization required: none
 */

router.post(
  '/:id/comments/new',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { content, userId } = req.body;
      const comment = await Post.createComment(content, userId, id);

      return res.json({ comment });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /posts/postId/comments
 *
 * Returns comment content, author, postId
 *
 *
 */

router.get('/:postId/comments', async function (req, res, next) {
  try {
    const comments = await Post.getComments(req.params.postId);
    return res.json({ comments });
  } catch (err) {
    return next(err);
  }
});

/** POST /posts/postId/like
 *
 * return true if successful adding to db
 *
 * Authorization required: loggedIn
 */

router.post('/:id/like', ensureLoggedIn, async function (req, res, next) {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    await Post.addLike(userId, id, 'post');
  } catch (err) {
    return next(err);
  }
});

/** POST /posts/postId/comments/id/like
 *
 *
 *
 * Authorization required: loggedIn
 */

router.post(
  '/:postId/comments/:commentId/like',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { userId } = req.body;
      const { commentId } = req.params;
      await Post.addLike(userId, commentId, 'comment');
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * Get Post likes
 *
 */

router.get('/:id/likes', ensureLoggedIn, async function (req, res, next) {
  try {
    const { id } = req.params;

    const result = await Post.getLikes(id, 'post');

    const likes = result.rows;
    return res.json({ likes });
  } catch (err) {
    return next(err);
  }
});

/** GET /posts/postId/comments/id/likes
 *
 *
 *
 * Authorization required: loggedIn
 */

router.get(
  '/:postId/comments/:commentId/likes',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { commentId } = req.params;
      const results = await Post.getLikes(commentId, 'comment');
      const likes = results.rows;
      return res.json({ likes });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
