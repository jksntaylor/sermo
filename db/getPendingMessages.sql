select *
from reddit_chats
where user2 = $1
and pending = true
or user1 = $1
and pending = true