UPDATE reddit_comments
SET text = $1
WHERE id = $2;