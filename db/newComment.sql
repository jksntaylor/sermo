INSERT INTO reddit_comments (user_id, text, time, author, date)
VALUES ($1, $2, $3, $4, $5);

SELECT * FROM reddit_comments
WHERE time = $3 