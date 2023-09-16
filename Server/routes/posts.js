'use strict';

/** Routes for posts. */

// const jsonschema = require('jsonschema');

const express = require('express');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');

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
    const post = await Post.createPost(req.body);

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
      const data = {
        content: req.body.content,
        img: req.body.img,
      };

      const post = await Post.updatePost(req.params.postId, data);
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
      return res.json({ deleted: req.params.postId });
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
    try {
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
      return res.json({ deleted: req.params.commentId });
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
    const { currentUserId } = req.body;
    const { id } = req.params;
    await Post.addLike(currentUserId, id, 'post');

    return res.json({ liked: true });
  } catch (err) {
    return next(err);
  }
});

/**
 * Get Post likes
 *
 */

router.get('/:postId/likes', ensureLoggedIn, async function (req, res, next) {
  try {
    const { postId } = req.params;

    const result = await Post.getLikes(postId, 'post');

    const likes = result;
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
  '/:postId/like/:userId',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { postId, userId } = req.params;
      const result = await Post.unlike(postId, 'post', userId);
      return res.json({ result });
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
      const { currentUserId } = req.body;
      const { commentId } = req.params;
      await Post.addLike(currentUserId, commentId, 'comment');
      return res.json({ liked: true });
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
  '/:postId/comments/:commentId/like/:userId',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { commentId, userId } = req.params;
      const result = await Post.unlike(commentId, 'comment', userId);
      return res.json({ deleted: result.id });
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
      const likes = results;

      return res.json({ likes });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
