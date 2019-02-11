INSERT INTO reddit_comments (user_id, text, time)
VALUES ($1, $2, $3);

SELECT * FROM reddit_comments
WHERE time = $3 
AND user_id = $1;