INSERT INTO reddit_posts_comments (parent_id, comment_id, post_id)
VALUES ($1, $2, $3);

SELECT * FROM reddit_posts_comments
WHERE comment_id = $2;