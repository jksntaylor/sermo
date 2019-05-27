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

    getMessageTeasers: async (req, res) => {
        const db = req.app.get('db');
        const {username} = req.session.user;
        if (!username) {
            res.sendStatus(403)
        }
        const messages = await db.getMessageTeasers([username]);
        if (messages[0]) {
            res.status(200).send(messages)
        } else {
            res.status(200).send([])
        }
    },

    getPendingMessages: async (req, res) => {
        const db = req.app.get('db');
        const {username} = req.session.user;
        const messages = await db.getPendingMessages([username]);
        if (messages[0]) { 
            res.status(200).send(messages)
        } else {
            res.status(200).send([])
        }
    },

    getOpenMessage: async (req, res) => {
        const db = req.app.get('db');
        const {room} = req.params;
        const info = await db.getOpenMessageInfo([room]);
        const message = await db.getOpenMessages([room]);
        const response = [info, message]
        if (message[0] && info[0]) {
            res.status(200).send(response)
        } else {
            res.sendStatus(404)
        }
    },

    newRequest: async (req, res) => {
        const db = req.app.get('db');
        const {sender, recipient, message} = req.body;
        const {content} = message;
        const timestamp = `${message.timestamp}`
        const room = `${sender}>${recipient}`;
        const request = await db.newMessageRequest([sender, recipient, timestamp, content, room, true, false]);
        if (request) {
            res.sendStatus(200)
        }
    },

    acceptMessage: async (req, res) => {
        const db = req.app.get('db');
        const {room} = req.body;
        console.log(req.body)
        const request = await db.newMessageResponse([room, true]);
        if (request[0]) {
            res.sendStatus(200);
        }
    },

    rejectMessage: async (req, res) => {
        const db = req.app.get('db');
        const {room} = req.body;
        const request = await db.newMessageResponse([room, false]);
        if (request[0]) {
            res.sendStatus(200);
        }
    },

    sendMessage: async (req, res) => {
        const db = req.app.get('db');
        const {author, content, timestamp } = req.body;
        const {room} = req.params;
        const message = await db.sendMessage([room, timestamp, data])
        if (message[0]) {
            res.status(200).send(message)
        }
    }
}