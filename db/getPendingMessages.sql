select id, user2, messages, room, pending, accepted 
from reddit_chats
where user1 = $1
and pending = true;
select id, user1, messages, room, pending, accepted 
from reddit_chats
where user2 = $1
and pending = true;