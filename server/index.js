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
const cc = require('./controllers/commentcontroller.js')
const vc = require('./controllers/votingcontroller.js')

const app = express();

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("i'm a lead farmer muthafucka!");
});

// TOP LEVEL MIDDLEWARE COMPETENCIES

app.use(bodyParser.json());

// EXPRESS STATIC COMPETENCY, I DON'T NEED IT RIGHT NOW BUT THIS IS HOW YOU DO IT, JUST GET RID OF ALL LOCALHOST AS WELL
app.use( express.static(`${__dirname}/../build`));

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
}));

// REQUEST LEVEL MIDDLEWARE COMPETENCIES

//AUTH
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/logout', ac.logout);
app.get('/api/checkAuth', ac.checkAuth);

//POSTS
app.post('/api/newTextPost', pc.newTextPost)
app.post('/api/newMediaPost', pc.newMediaPost)
app.get('/api/initialLoadPosts', pc.initialLoad)
app.get('/api/:filter/:time/:limit/:page', pc.sortPosts)
app.post('/api/deletePost/:id', pc.deletePost)

//VOTING
app.post('/api/:postID/voting', vc.updateVoting)

//COMMENTS
app.post('/api/newComment', cc.newComment)
app.get('/api/:postID/comments', cc.getPostComments)
app.post('/api/deleteComment/:id', cc.deleteComment)
app.post('/api/editComment/:id', cc.editComment)

// REST QUERY COMPETENCIES
app.get('/api/searchusers', ac.searchusers)

app.listen(SERVER_PORT, () => {
    console.log('i need some goddamn jellybeans', SERVER_PORT)
})