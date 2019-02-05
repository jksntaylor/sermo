module.exports = {
    newPost: async (req, res) => {
        const db = req.app.get('db');
        const {id, username} = req.session.user
        const {title, text} = req.body;
        const time = new Date();

        const newPost = await db.newPost([id, title, text, time, username]);

        return res.status(200).send(newPost)
    },

    initialLoad: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.initialLoadPosts();
        return res.status(200).send(posts);  
    }
}