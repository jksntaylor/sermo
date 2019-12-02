module.exports = {
    getUserPosts: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const posts = await db.getUserPosts([id]);
        res.status(200).send(posts);
    }
}