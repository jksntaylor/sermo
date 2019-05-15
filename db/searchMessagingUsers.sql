select id, username from reddit_users
where username like $1
and username != $2;