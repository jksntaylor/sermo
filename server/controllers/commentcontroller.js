module.exports = {
    newComment: async (req, res) => {
        const {text, parentID, parentIsPost} = req.body;
        const user_id = req.session.user.id
        const currentDate = new Date();
        const time = currentDate.getTime().toString();
        console.log(text, parentID, parentIsPost, user_id, time)
        const db = req.app.get('db');
        const newComment = await db.newComment([user_id, text, time]);
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
    }
}