select id, username from reddit_users ru
where username like LOWER($1)
and username != $2
and username not in (
    select user2 from reddit_chats
    where user1 = $2
)
and username not in (
    select user1 from reddit_chats
    where user2 = $2
)