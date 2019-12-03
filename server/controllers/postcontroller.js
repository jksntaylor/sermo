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
        } else if (type==='media') {
            newPost = await db.newPost([id, title, null, date, username, time, 'media', link, [0,id], [0]]);
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

    // sortPosts: async (req, res) => {
    //     const db = req.app.get('db');
    //     const currentDate = new Date;
    //     const currentTime = currentDate.getTime();
    //     const {filter, limit, page, time} = req.params;
    //     const offset = page * limit
    //     if (time==='day') {
    //         var range = 86400000;
    //     } else if (time==='week') {
    //         range = 604800000;
    //     } else if (time==='month') {
    //         range = 18144000000 
    //     } else {
    //         range = 9999999999999
    //     }
    //     if (filter==='new') {
    //         var posts = await db.getNewPosts([currentTime, range, limit, offset])
    //     } else if (filter==='top') {
    //         posts = await db.getTopPosts([currentTime, range, limit, offset])
    //     } else {
    //         posts = await db.getActivePosts([currentTime, range, limit, offset])
    //     }
    //     res.status(200).send(posts)
    // },

    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.deletePost([id]).then(() => {
            res.sendStatus(200)
        })
    }
}