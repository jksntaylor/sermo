SELECT * FROM reddit_posts
WHERE ($1-timems) < $2
ORDER BY (CARDINALITY(upvoters)-CARDINALITY(downvoters)) DESC;