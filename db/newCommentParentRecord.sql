INSERT INTO reddit_posts_comments (parent_id, comment_id, parent_is_post)
VALUES ($1, $2, $3);

SELECT * FROM reddit_posts_comments
WHERE comment_id = $2;