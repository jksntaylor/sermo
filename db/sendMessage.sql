INSERT INTO reddit_messages (room_id, timems, author, content, read)
VALUES ($1, $2, $3, $4, false);

SELECT * FROM reddit_messages
WHERE room_id = $1
ORDER BY timems DESC;