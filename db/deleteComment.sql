DELETE FROM reddit_comments
WHERE id = $1;

DELETE FROM reddit_posts_comments
WHERE comment_id = $1;