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
        const {username} = req.session.user;
        const messages = await db.getAllMessages([username]);
        if (messages[0]) {
            res.status(200).send(messages)
        } else {
            res.sendStatus(404)
        }
    },

    newRequest: async (req, res) => {
        const db = req.app.get('db');
        const {username} = req.session.user;
        const {username2, messages} = req.body;
        const room = `${username}>${username2}`;
        const request = await db.newMessageRequest([username, username2, messages, room, true, false]);
        if (request[0]) {
            res.sendStatus(200)
        }
    }
}