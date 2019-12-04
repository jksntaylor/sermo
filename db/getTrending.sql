SELECT id, title, text, media FROM reddit_posts
WHERE posttype = 'link' AND text LIKE '%nytimes%'
ORDER BY timems DESC
LIMIT 3;