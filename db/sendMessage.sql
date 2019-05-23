UPDATE reddit_chats
SET messages = jsonb_set(messages, $2, $3)
WHERE room = $1;

SELECT * from reddit_chats
WHERE room = $1;