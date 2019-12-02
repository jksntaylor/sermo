SELECT * FROM reddit_posts
WHERE title ILIKE $1
OR text ILIKE $1
ORDER BY timems DESC;