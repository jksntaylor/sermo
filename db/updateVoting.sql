UPDATE reddit_posts
SET upvoters = $1,
    downvoters = $2
WHERE id = $3;