const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, email, password} = req.body;

        const existingUser = await db.checkExistingUser([username]);
        if (existingUser[0]) {
            return res.status(409).send('Username Taken');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeringUser = await db.registerUser([username, email, hash]);
        const user = registeringUser[0];

        req.session.user = {
            email: user.email,
            name: user.name,
            id: user.id
        }
        return res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password, remember} = req.body;

        const getUser = await db.getUser([username]);
        const user = getUser[0];

        if (!user) {
            return res.status(401).send('User not found');
        }

        const isAuthenticated = bcrypt.compareSync(password, user.hash);

        if (!isAuthenticated) {
            return res.status(403).send('Invalid Credentials');
        }

        req.session.user = user;
        if (remember) {
            var year = 86400000 * 365;
            req.session.cookie.expires = new Date(Date.now() + year);
            req.session.cookie.maxAge = year;
        }
        res.status(200).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },

    checkAuth: (req, res) => {
        if (req.session.user) {
            return res.status(200).send(req.session.user)
        } else {
             res.status(200).send(null);
        }
    },

    //REST QUERY COMPETENCIES

    searchusers: async (req, res) => {
        const db = req.app.get('db');
        const {user} = req.query
        const gotUser = await db.searchuser([user])
        if (gotUser[0]) {
            res.status(200).send(gotUser[0])
        } else {
            res.status(200).send('No User Found')
        }
    }
}