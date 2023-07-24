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

router.get('/', async function (req, res, next) {
  const posts = await Post.findAll();
  return res.json({ posts });
});

/** POST /posts/postId/comment/news
 *
 * Returns comment content, author, postId
 *
 * Authorization required: loggedIn
 */

router.post(
  '/:postId/comment/new',
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { content, username, postId } = req.body;
      const comment = await Post.createComment(content, username, postId);

      return res.json({ comment });
    } catch (err) {
      return next(err);
    }
  }
);

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

/** POST /posts/postId/like
 *
 * return true if successful adding to db
 *
 * Authorization required: loggedIn
 */

router.post('/:postId/like', ensureLoggedIn, async function (req, res, next) {
  try {
    const { userId, postId } = req.body;
    await Post.likePost(postId, userId);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
