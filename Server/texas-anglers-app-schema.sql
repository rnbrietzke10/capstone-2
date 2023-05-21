
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  profile_img TEXT,
  cover_img TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
  user_one VARCHAR(25) NOT NULL,
  user_two VARCHAR(25) NOT NULL,
  date_requested TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  date_accepted TIMESTAMP,
  date_terminated TIMESTAMP
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  author VARCHAR(25) NOT NULL, -- References User id that made post
  content TEXT NOT NULL,
  page_posted_on TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id int, --post replied to
  author VARCHAR(25) NOT NULL, -- References User id that made comment
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE likes (
  like_id int PRIMARY KEY,
  username VARCHAR(25) NOT NULL, -- user who liked the comment
  post_id int NOT NULL, --post or comment liked
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- CREATE TABLE lakes (
--   handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
--   name TEXT UNIQUE NOT NULL,
--   description TEXT NOT NULL,
--   lake_acreage INTEGER,
--   max_depth INTEGER,
--   reservoir_controlling_authority TEXT,
--   angling_oppurtunities TEXT NOT NULL,
--   tips TEXT[],
--   map_url TEXT
-- );


-- CREATE TABLE rivers (
--   handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
--   name TEXT UNIQUE NOT NULL,
--   description TEXT NOT NULL,
--   map_url TEXT
-- );

-- CREATE TABLE fish (
--   name VARCHAR(50) PRIMARY KEY,
--   image TEXT,
--   description TEXT
-- );


-- CREATE TABLE fish_location (
--   id int PRIMARY KEY,
--   fish_name VARCHAR(50),
--   location_handle VARCHAR(25)
-- );



-- CREATE TABLE user_fish (
--   user_id int NOT NULL,
--   fish_name VARCHAR(50) NOT NULL
-- )