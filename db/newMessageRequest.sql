INSERT INTO reddit_chats (user1, user2, room, pending, accepted)
VALUES ($1, $2, $5, $6, $7);
UPDATE reddit_chats
SET messages = jsonb_set(messages, $3, $4)