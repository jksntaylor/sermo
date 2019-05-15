module.exports = {
    searchUsers: async (req, res) => {
        const db = req.app.get('db');
        const {username} = req.session.user
        const search = `%${req.params.query}%`
        const results = await db.searchMessagingUsers([search, username]);
        if (results[0]) {
            res.status(200).send(results)
        } else {
            res.sendStatus(404)
        }
    },

    getAllMessages: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const messages = await db.getAllMessages([+id]);
        if (messages[0]) {
            res.status(200).send(messages)
        } else {
            res.sendStatus(404)
        }
    }
}