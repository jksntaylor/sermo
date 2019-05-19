select id, user1, user2, messages, room, pending, accepted 
from reddit_chats
where user1 = $1
and pending = false
and accepted = true
or user2 = $1
and pending = false
and accepted = true