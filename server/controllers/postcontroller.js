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
        const posts = await db.initialGetPosts([20, 0]);
        return res.status(200).send(posts);  
    },

    sortPosts: async (req, res) => {
        const db = req.app.get('db');
        const currentDate = new Date;
        const currentTime = currentDate.getTime();
        const {filter, limit, page, time} = req.params;
        const offset = page * limit
        if (time==='day') {
            var range = 86400000;
        } else if (time==='week') {
            range = 604800000;
        } else if (time==='month') {
            range = 18144000000 
        } else {
            range = 9999999999999
        }
        // console.log(req.params, currentDate, currentTime);
        if (filter==='new') {
            var posts = await db.getNewPosts([currentTime, range, limit, offset])
        } else if (filter==='top') {
            posts = await db.getTopPosts([currentTime, range, limit, offset])
        } else {
            posts = await db.getActivePosts([currentTime, range, limit, offset])
        }
        res.status(200).send(posts)
    }
}