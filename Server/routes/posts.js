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
    const { content, userId, postLocation, img } = req.body;
    const post = await Post.createPost(content, userId, postLocation, img);

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

router.patch(
  '/:postId/update',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      console.log('INSIDE PATCH ROUTE');
      const post = await Post.updatePost(req.params.postId, req.body);
      return res.json({ post });
    } catch (err) {
      return next(err);
    }
  }
);

/** DELETE posts/[postId]/delete
 * Deletes on post
 * Authorization required: same-user-as-: userId
 **/

router.delete(
  '/:postId/delete',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { postId } = req.params;
      await Post.deletePost(postId);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  }
);

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

/** PATCH /[postId]/comments/[commentId]
 *
 * Data can include:
 *   { content, commentId userId, postId}
 *
 * Returns { content, commentId, postId, userId}
 *
 * Authorization required: same-user-as-userId on post
 **/

router.patch(
  '/:postId/comments/:commentId/update',
  ensureCorrectUser,
  async function (req, res, next) {
    console.log(req.body.content);
    try {
      console.log('INSIDE PATCH ROUTE');
      const comment = await Post.updateComment(req.params.commentId, {
        content: req.body.content,
      });
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

/** DELETE posts/[postId]/comments/[commentId]/delete
 * Deletes on post
 * Authorization required: same-user-as-: userId
 **/

router.delete(
  '/:postId/comments/:commentId/delete',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { commentId } = req.params;
      await Post.deleteComment(commentId);
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  }
);

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

/** DELETE posts/[postId]/like =>  { deleted: id }
 * Unlikes on post
 * Authorization required: same-user-as-: userId
 **/

router.delete(
  '/:postId/like',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { postId } = req.params;
      await Post.unlike(postId, 'post');
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  }
);

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

/** DELETE posts/[postId]/comments/[commentId]/likes =>  { deleted: id }
 * Unlikes on comment
 * Authorization required: same-user-as-: userId
 **/

router.delete(
  '/:postId/comments/:commentId/like',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { commentId } = req.params;
      await Post.unlike(commentId, 'comment');
      return res.json({ deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  }
);

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
