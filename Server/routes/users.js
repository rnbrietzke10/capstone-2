'use strict';

/** Routes for users. */

const jsonschema = require('jsonschema');

const express = require('express');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: logged In
 **/

router.get('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const users = await User.findAll(res.locals.user.username);
    console.log(users);
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName}
 *
 *
 * Authorization required: same user-as-:username
 **/

router.get('/:username', ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email}
 *
 * Authorization required: same-user-as-:username
 **/

router.patch('/:username', ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

router.delete('/:username', ensureCorrectUser, async function (req, res, next) {
  try {
    await User.deleteUser(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

/** POST /users/follow
 *
 * Authorization required: ensureLoggedIn
 **/

router.post('/follow', ensureLoggedIn, async function (req, res, next) {
  try {
    const { followerId, followedId } = req.body;
    await User.follow(followerId, followedId);

    return res.json({ follow: true });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /users/unfollow
 *
 * Authorization required: ensureCorrectUser
 **/

router.delete(
  '/:username/unfollow',
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const { userId, currentUserId } = req.body;
      await User.unfollow(userId, currentUserId);
      return res.json({ unfollow: true });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET /[id]/following
 *
 * Returns { [list of following ] }
 *
 *
 * Authorization required: logged in
 **/

router.get('/:id/following', ensureLoggedIn, async function (req, res, next) {
  try {
    const following = await User.getFollowingList(req.params.id);
    return res.json({ following });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
