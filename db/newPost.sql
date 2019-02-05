INSERT INTO reddit_posts (user_id, title, text, time, author)
VALUES ($1, $2, $3, $4, $5);

SELECT * FROM reddit_posts
ORDER BY id DESC
LIMIT 20;