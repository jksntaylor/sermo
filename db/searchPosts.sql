SELECT * FROM reddit_posts
WHERE title LIKE $1
OR text LIKE $1;