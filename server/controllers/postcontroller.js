module.exports = {
    newPost: async (req, res) => {
        const db = req.app.get('db');
        const {id, username} = req.session.user
        const {title, text} = req.body;
        const date = new Date();
        const time = date.getTime().toString();
        const newPost = await db.newPost([id, title, text, date, username, time]);

        return res.status(200).send(newPost)
    },

    initialLoad: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.getNewPosts([20, 0]);
        return res.status(200).send(posts);  
    },

    sortPosts: async (req, res) => {
        const db = req.app.get('db');
        const currentDate = new Date;
        const currentTime = currentDate.getTime();
        const {filter, limit, page} = req.params;
        // console.log(req.params, currentDate, currentTime);
        if (filter==='new') {
            var posts = await db.getNewPosts([])
        } else if (filter==='top') {
            posts = await db.getTopPosts([])
        } else {
            posts = await db.getActivePosts([])
        }
        res.status(200).send(posts)
    }
}