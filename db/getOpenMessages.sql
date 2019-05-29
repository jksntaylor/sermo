select rm.* from reddit_messages rm
join reddit_chats rc on rc.id = rm.room_id
where rc.room = $1
order by rm.timems desc