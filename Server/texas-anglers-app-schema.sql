CREATE TABLE lakes (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  lake_acreage INTEGER,
  max_depth INTEGER,
  reservoir_controlling_authority TEXT,
  angling_oppurtunities TEXT NOT NULL,
  tips TEXT[],
  map_url TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
);

CREATE TABLE rivers (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  map_url TEXT
);

CREATE TABLE fish (
  name VARCHAR(50) PRIMARY KEY,
  image TEXT, 
  description TEXT,
);
