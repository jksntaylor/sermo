SELECT * FROM reddit_posts
WHERE user_id = $1
ORDER BY timems DESC
LIMIT 5;