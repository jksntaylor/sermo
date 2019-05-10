module.exports = {
    newTextPost: async (req, res) => {
        console.log('posting2');
        const db = req.app.get('db');
        const {title, text, anon} = req.body;
        console.log(req.session)
        if (anon) {
            var {id} = req.session.user
            var username = null
        } else {
            var {id} = req.session.user;
            var username = req.session.user.username;
        }
        const date = new Date();
        const time = date.getTime().toString();
        const newPost = await db.newPost([id, title, text, date, username, time, 'text', null, [0, id], [0]]);
        console.log(newPost)
        return res.status(200).send(newPost)
    },

    newMediaPost: async (req, res) => {
        const db = req.app.get('db');
        const {title, link, anon} = req.body
        if (anon) {
            var {id} = req.session.user
            var username = null
        } else {
            var id = req.session.user.id;
            var username = req.session.user.username;
        }
        const date = new Date();
        const time = date.getTime().toString();
        const newPost = await db.newPost([id, title, null, date, username, time, 'media', link, [0, id], [0]]);

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
    },

    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.deletePost([id]).then(() => {
            res.sendStatus(200)
        })
    }
}