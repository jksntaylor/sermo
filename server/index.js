const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

require('dotenv').config();
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env;

// CONTROLLERS
const ac = require('./controllers/authcontroller.js')
const pc = require('./controllers/postcontroller.js')
const cc = require('./controllers/commentcontroller.js')
const vc = require('./controllers/votingcontroller.js')
const mc = require('./controllers/messagingcontroller.js')

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("i'm a lead farmer muthafucka!");
});

app.use(bodyParser.json());

app.use( express.static(`${__dirname}/../build`));

const middleware = session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
    })

app.use(middleware);

let onlineUsers = {};

io.on('connection', function(socket) {
    let onlineSocket, onlineUsername;
    socket.on('username', function(onlineUser) {
        if (onlineUser.socket && !onlineUsers[onlineUser.socket]) {onlineUsers[onlineUser.socket] = onlineUser.username}
        console.log(`${onlineUser.username} connected\nOnline Users:`)
        console.log(onlineUsers)
        onlineSocket = onlineUser.socket;
        onlineUsername = onlineUser.username
    })
    socket.on('chat message', function(message) {
        console.log(message)
        io.emit('chat message', message)
    })
    socket.on('chat request', function(user1, user2) {
        socket.join(`${user1}||${user2}`) 
    })

    socket.on('direct message', function(room, message) {
        io.in(room).emit('dm', message)
    })
    socket.on('disconnect', function() {
        delete onlineUsers[onlineSocket]
        console.log(`${onlineUsername} disconnected\nOnline Users:`);
        console.log(onlineUsers)
    });
})


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

// // MESSAGING
// app.post('/api/newMessageRequest', mc.newRequest)
// app.post('/api/newMessageConfirm', mc.confirm)
app.get('/api/getAllMessages', mc.getAllMessages)
// app.get('/api/messages/:id', mc.getMessages)
// app.post('/api/messages/:id/newMessage', mc.newMessage)
app.get('/api/messaging/searchUsers/:query', mc.searchUsers)

// SOCKETS

http.listen(SERVER_PORT, () => {
    console.log('i need some goddamn jellybeans', SERVER_PORT)
})