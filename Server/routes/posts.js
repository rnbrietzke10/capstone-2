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

router.post('/:postId/like', ensureLoggedIn, async function (req, res, next) {
  try {
    const { userId, postId } = req.body;
    await Post.likePost(userId, postId);
  } catch (err) {
    return next(err);
  }
});

/**
 * Get likes
 *
 */

router.get('/:postId/like', ensureLoggedIn, async function (req, res, next) {
  try {
    const { postId } = req.params;

    const result = await Post.getLikes(postId);
    console.log(result.rows);
    const likes = result.rows;
    return res.json({ likes });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
