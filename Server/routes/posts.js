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
 * Returns post content, author, postId
 *
 * Authorization required: none
 */

router.post('/new', ensureLoggedIn, async function (req, res, next) {
  try {
    const { content, username, pagePostedOn } = req.body;
    const post = await Post.createPost(content, username, pagePostedOn);

    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
