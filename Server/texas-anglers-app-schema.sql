
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  profile_img TEXT,
  cover_img TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	followed_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE(follower_id, followed_id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- References User id that made post
  content TEXT NOT NULL,
  img TEXT,
  post_location VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id), --post replied to
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- References User id that made comment
  content TEXT NOT NULL,
  img VARCHAR(300),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- user who liked the comment
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE, --post or comment liked
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
	CHECK(
		COALESCE((post_id)::BOOLEAN::INTEGER, 0)
		+
		COALESCE((comment_id)::BOOLEAN::INTEGER, 0)
		= 1
	),
	UNIQUE(user_id, post_id),

	UNIQUE(user_id, comment_id)
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