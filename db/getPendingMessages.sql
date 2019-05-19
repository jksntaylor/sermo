select id, user1, user2, messages, room, pending, accepted 
from reddit_chats
where user2 = $1
or user1 = $1
and pending = true;