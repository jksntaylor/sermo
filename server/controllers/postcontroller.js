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
        const posts = await db.getNewPosts([20, 0]);
        return res.status(200).send(posts);  
    },

    sortPosts: async (req, res) => {
        const db = req.app.get('db');
        const currentTime = new Date.getTime();
        const {filter, limit, page} = req.params;
        console.log(req.params, currentTime);
    }
}