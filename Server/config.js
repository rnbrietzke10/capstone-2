'use strict';

/** Shared config for application; can be required many places. */

require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = +process.env.PORT;

module.exports = {
  SECRET_KEY,
  PORT,
  //   BCRYPT_WORK_FACTOR,
  //   getDatabaseUri,
};
