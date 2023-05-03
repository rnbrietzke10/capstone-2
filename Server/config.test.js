'use strict';

describe('config can come from env', () => {
  test('works', () => {
    process.env.SECRET_KEY = 'abc';
    process.env.PORT = '5000';
    process.env.DATABASE_URL = 'other';
    process.env.NODE_ENV = 'other';

    const config = require('./config');
    expect(config.SECRET_KEY).toEqual('abc');
    expect(config.PORT).toEqual(5000);
  });

  delete process.env.SECRET_KEY;
  delete process.env.PORT;
  delete process.env.DATABASE_URL;

  expect(config.getDatabaseUri()).toEqual('jobly');
  process.env.NODE_ENV = 'test';
  expect(config.getDatabaseUri()).toEqual('jobly_test');
});
