'use strict';

/* Express app for Texas Anglers App */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

module.exports = app;
