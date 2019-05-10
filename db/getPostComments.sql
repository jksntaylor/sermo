SELECT * FROM reddit_comments rc
JOIN reddit_posts_comments rpc ON rc.id = rpc.comment_id
WHERE rpc.parent_id = $1
AND rpc.parent_id = rpc.post_id
ORDER BY rc.time;