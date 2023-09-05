'use strict';

const db = require('../db.js');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');
const Post = require('../models/post.js');
process.env.NODE_ENV = 'test';
async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query('DELETE FROM users');
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: 'u1' });
const u2Token = createToken({ username: 'u2' });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
