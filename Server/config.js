'use strict';

/** Shared config for application; can be required many places. */

require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = +process.env.PORT;
function getDatabaseUri() {
  return process.env.NODE_ENV === 'test'
    ? 'texas_anglers_app_test'
    : process.env.DATABASE_URL || 'texas_anglers_app';
}

module.exports = {
  SECRET_KEY,
  PORT,
  //   BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
