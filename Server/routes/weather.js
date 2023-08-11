// `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lng}&aqi=no`

'use strict';

/** Routes for weather api. */

// const jsonschema = require('jsonschema');

const express = require('express');
const axios = require('axios');
const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');

const router = express.Router();
//   , ensureLoggedIn
router.get('/', async function (req, res, next) {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;
    const result = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}&days=3&aqi=no&alerts=no`
    );
    console.log('RESULT DATA', result.data);
    const data = result.data;
    return res.json({ data });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
