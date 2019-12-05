SELECT DISTINCT
   COUNT(rpc.post_id) OVER (PARTITION BY rp.id)  AS  num_comments 
    , rp.*  FROM reddit_posts rp 
    WHERE ($1-timems) < $2
   JOIN reddit_posts_comments rpc ON rp.id = rpc.post_id
ORDER BY num_comments DESC;
