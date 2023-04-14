'use strict';

const app = require('./app');

const PORT = 8080;

app.listen(PORT, function () {
  console.log(`Started server on Port: ${PORT}`);
});
