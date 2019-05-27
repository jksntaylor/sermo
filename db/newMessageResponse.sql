UPDATE reddit_chats
SET pending = false,
    accepted = $2
WHERE room = $1