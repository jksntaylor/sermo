INSERT INTO reddit_posts (user_id, title, text, time, author, timeMS, posttype, media)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

SELECT * FROM reddit_posts
ORDER BY id DESC
LIMIT 20;