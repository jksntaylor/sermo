UPDATE reddit_chats
SET pending = false,
    accepted = $1
WHERE user1 = $2 AND user2 = $3;