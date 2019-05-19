UPDATE reddit_chats
SET pending = false,
    accepted = $3
WHERE user1 = $1 AND user2 = $2;