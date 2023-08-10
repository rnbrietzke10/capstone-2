// `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lng}&aqi=no`

'use strict';

/** Routes for weather api. */

// const jsonschema = require('jsonschema');

const express = require('express');
const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');

const router = express.Router();

router.get('/weather/', ensureLoggedIn, async function (req, res, next) {
  try {
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});
