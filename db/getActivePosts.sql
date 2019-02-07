-- SELECT * FROM reddit_posts p
-- WHERE ($1-timems) < $2
-- JOIN reddit_posts_comments pc ON p.id = pc.post_id
-- ORDER BY (SELECT COUNT(*) FROM pc WHERE pc.post_id = p.id) DESC
-- LIMIT $3
-- OFFSET $4

--idk if this will work