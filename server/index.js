const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env;

// CONTROLLERS
const ac = require('./controllers/authcontroller.js')
const pc = require('./controllers/postcontroller.js')

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("i'm a lead farmer muthafucka!");
});

// TOP LEVEL MIDDLEWARE COMPETENCIES

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    expires: 2147483647000
}));

// REQUEST LEVEL MIDDLEWARE COMPETENCIES

//AUTH
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/logout', ac.logout);
app.get('/api/checkAuth', ac.checkAuth);

//POSTS
app.get('/api/initialLoadPosts', pc.initialLoad)
app.post('/api/newpost', pc.newPost)

app.listen(SERVER_PORT, () => {
    console.log('i need some goddamn jellybeans', SERVER_PORT)
})