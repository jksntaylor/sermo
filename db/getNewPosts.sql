SELECT * FROM reddit_posts
WHERE ($1-timems) > $2
ORDER BY id DESC
LIMIT $3
OFFSET $4