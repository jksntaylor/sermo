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
        if (!username) {
            res.sendStatus(403)
        }
        const messages = await db.getAllMessages([username]);
        if (messages[0]) {
            res.status(200).send(messages)
        } else {
            res.sendStatus(404)
        }
    },

    getPendingMessages: async (req, res) => {
        const db = req.app.get('db');
        const {username} = req.session.user;
        const messages = await db.getPendingMessages([username]);
        if (messages) {
            res.status(200).send(messages)
        } else {
            res.sendStatus(404)
        }
    },

    newRequest: async (req, res) => {
        const db = req.app.get('db');
        const {sender, recipient, message} = req.body;
        const timestamp = `{${message.timestamp}}`
        const content = {"content": message.content,
                         "author": sender}
        const room = `${sender}>${recipient}`;
        const request = await db.newMessageRequest([sender, recipient, timestamp, content, room, true, false]);
        if (request[0]) {
            res.sendStatus(200)
        }
    },

    acceptMessage: async (req, res) => {
        const db = req.app.get('db');
        const username2 = req.session.user.username
        const {username} = req.body;
        console.log(req.body)
        const request = await db.newMessageResponse([username, username2, true]);
        if (request[0]) {
            res.sendStatus(200);
        }
    },

    rejectMessage: async (req, res) => {
        const db = req.app.get('db');
        const username2 = req.session.user.username
        const {username} = req.body;
        const request = await db.newMessageResponse([username, username2, false]);
        if (request[0]) {
            res.sendStatus(200);
        }
    }
}