-- CREATE TABLE reddit_users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR,
--     hash VARCHAR,
--     email VARCHAR,
--     savedPosts VARCHAR []
-- )

-- CREATE TABLE reddit_users_friends (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     friend_id INTEGER
-- )

-- CREATE TABLE reddit_posts (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     title VARCHAR,
--     text TEXT,
--     upvoters INTEGER[],
--     downvoters INTEGER[]
-- )

-- CREATE TABLE reddit_comments (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER,
--     text TEXT
-- )

-- CREATE TABLE reddit_posts_comments (
--     id SERIAL PRIMARY KEY,
--     parent_id INTEGER,
--     comment_id INTEGER,
--     post_id INTEGER
-- )