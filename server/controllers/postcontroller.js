const mql = require('@microlink/mql');

module.exports = {
    newPost: async (req, res) => {
        const db = req.app.get('db');
        const {title, content, link} = req.body;
        const {type} = req.params;
        const {id, username} = req.session.user;
        const date = new Date();
        const time = date.getTime().toString();
        let newPost;

        if (type==='text') {
            newPost = await db.newPost([id, title, content, date, username, time, 'text', null, [0, id], [0]]);
        } else if (type==='mediaFile') {
            newPost = await db.newPost([id, title, null, date, username, time, 'media', link, [0,id], [0]]);
        } else if (type==='mediaLink') {
            newPost = await db.newPost([id, title, null, date, username, time, 'media', content, [0,id], [0]]);
        } else {
            const {data} = await mql(content);
            const {image, url} = data;
            const linkTitle = data.title;
            newPost = await db.newPost([id, linkTitle, url, date, username, time, 'link', image['url'], [0,id], [0]]);
        };

        return res.status(200).send(newPost);
    },

    initialLoad: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.initialGetPosts([20, 0]);
        return res.status(200).send(posts);  
    },

    searchPosts: async (req, res) => {
        const db = req.app.get('db');
        const search = `%${req.params.query}%`;
        const posts = await db.searchPosts([search]);
        res.status(200).send(posts);
    },

    getTrending: async (req, res) => {
        const db = req.app.get('db');
        const trending = await db.getTrendingNews();
        res.status(200).send(trending)
    },

    sortPosts: async (req, res) => {
        const db = req.app.get('db');
        const {type, time} = req.body;
        let posts;
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        let range = time==='Today' ? 86400000 : time==='This Week' ? 604800000 : time==='This Month' ? 18144000000 : 1814400000000;
        if (type==='Trending') {
            posts = await db.getTopPosts([currentTime, 86400000]);
        } else if (type==='Most Comments') {
            posts = await db.getActivePosts([currentTime, range]);
        } else {
            posts = await db.getTopPosts([currentTime, range])
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