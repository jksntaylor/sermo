select id, username from reddit_users ru
where username like $1
and username != $2;
and username not in (
    select rc.user1_id where rc.user2_id = $2
    join reddit_chats rc on ru.id = rc.user2_id;
    select rc.user2_id where rc.user1_id = $2
    join reddit_chats rc on ru.id = rc.user1_id;
)