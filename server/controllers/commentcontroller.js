module.exports = {
    newComment: async (req, res) => {
        const {text, parentID, parentIsPost} = req.body;
        const user_id = req.session.user.id
        const author = req.session.user.username;
        const currentDate = new Date();
        const date = currentDate.toString();
        const timeMS = currentDate.getTime().toString();
        console.log(text, parentID, parentIsPost, user_id, timeMS)
        const db = req.app.get('db');
        const newComment = await db.newComment([user_id, text, timeMS, author, date]);
        const newRecord = await db.newCommentParentRecord([parentID, newComment[0].id,parentIsPost]);
        if (newRecord[0]) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    },

    getPostComments: async (req, res) => {
        const db = req.app.get('db');
        const {postID} = req.params;
        const comments = await db.getPostComments([postID])
        res.status(200).send(comments);
    },

    getCommentComments: async (req, res) => {
        console.log('working on it')
    },

    editComment: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {text} = req.body;
        try {
            db.editComment([text, +id]);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send(error)
        }
    },

    deleteComment: (req, res) => {
        const db =req.app.get('db')
        const {id} = req.params
        try {
            db.deleteComment([+id]);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send(error)
        }
    }
}