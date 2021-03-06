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

-- user1 is always origin. if pending, user2 has option to accept or decline

-- CREATE TABLE reddit_chats (
--     id SERIAL PRIMARY KEY,
--     user1 VARCHAR,
--     user2 VARCHAR,
--     note VARCHAR,
--     room VARCHAR,
--     pending BOOLEAN,
--     accepted BOOLEAN
-- )

-- CREATE TABLE reddit_messages (
--     id SERIAL PRIMARY KEY,
--     room_id INTEGER REFERENCES reddit_chats(id),
--     timems INTEGER,
--     content TEXT,
--     author VARCHAR,
--     read BOOLEAN
-- );