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
const uc = require('./controllers/usercontroller.js')

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("database connection active");
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
        if (onlineUser.socket && !onlineUsers[onlineUser.socket]) {onlineUsers[onlineUser.username] = onlineUser.socket}
        console.log(`${onlineUser.username} connected\nOnline Users:`)
        console.log(onlineUsers)
        onlineSocket = onlineUser.socket;
        onlineUsername = onlineUser.username
        io.emit('user connection', onlineUsers)
    })

    socket.on('join room', function(room) {
        socket.join(room)
        console.log('joined', room)
    })

    socket.on('send message request', function(username, message) {
        if (onlineUsers[username]) {
            console.log('emitting', onlineUsers[username], message)
            io.to(`${onlineUsers[username]}`).emit('request', message);
        }
    })

    socket.on('direct message', function(room, message) {
        io.in(room).emit('dm', message)
    })

    socket.on('disconnect', function() {
        delete onlineUsers[onlineSocket]
        console.log(`${onlineUsername} disconnected\nOnline Users:`);
        console.log(onlineUsers)
        io.emit('user disconnection', onlineUsers)
    });
})


//AUTH
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/logout', ac.logout);
app.get('/api/checkAuth', ac.checkAuth);

//POSTS
app.post('/api/newPost/:type', pc.newPost)
app.get('/api/initialLoadPosts', pc.initialLoad)
// app.get('/api/:filter/:time/:limit/:page', pc.sortPosts)
app.post('/api/deletePost/:id', pc.deletePost)
app.get('/api/searchPosts/:query', pc.searchPosts)
app.get('/api/trending', pc.getTrending)

//VOTING
app.post('/api/:postID/voting', vc.updateVoting)

//COMMENTS
app.post('/api/newComment', cc.newComment)
app.get('/api/:postID/comments', cc.getPostComments)
app.post('/api/deleteComment/:id', cc.deleteComment)
app.post('/api/editComment/:id', cc.editComment)

// MESSAGING
app.post('/api/newMessageRequest', mc.newRequest)
app.post('/api/acceptMessage', mc.acceptMessage),
app.post('/api/rejectMessage', mc.rejectMessage)
app.get('/api/getMessageTeasers', mc.getMessageTeasers)
app.get('/api/getPendingMessages', mc.getPendingMessages)
app.get('/api/getOpenMessage/:room', mc.getOpenMessage)
app.post('/api/sendMessage', mc.sendMessage)
app.get('/api/messaging/searchUsers/:query', mc.searchUsers)

// USER
app.get('/api/getUserPosts/:id', uc.getUserPosts)

// SOCKETS

http.listen(SERVER_PORT, () => {
    console.log('sermo listening on', SERVER_PORT)
})