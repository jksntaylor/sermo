select * from reddit_chats
where user1_id = $1 or user2_id = $1;