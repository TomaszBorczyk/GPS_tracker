const express = require('express'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    http = require('http');

const API = require('./server/config/api.config');
const config = require('./server/config/config');
const User = require('./server/models/user.model');
const port = process.env.PORT || config.port;
const db = process.env.DB_REMOTE || config.db;
const app = express();
const deviceRouter = require('./server/routes/device.router');
const userRouter = require('./server/routes/user.router');
let io = require('socket.io');

passport.use(new localStrategy({usernameField: 'email'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(API.CORE + API.DEVICE, deviceRouter);
app.use(API.CORE + API.USER, userRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

const server = http.createServer(app);

// exports.userSockets = let userSockets;

mongoose.connect(db);
if(!module.parent){
    server.listen(port);
    io = io(server);
    io.on('connection', socket => {
        console.log(socket.id);
    });
    app.set('io', io);
    // startSocket();
}

function startSocket(){
    io.on('connection', function(socket){
        const clientId = socket.id;
        console.log('a user connected', clientId);

        socket.broadcast.emit('broadcast', 'HELLO FRIENDS');

        socket.emit('hey', 'I just met you');

        socket.on('disconnect', function(){
          console.log('user disconnected');
        });

        socket.on('my-id', myId => {
            console.log('Got ', myId, 'returning it back...');
            socket.to(myId).emit('return-message', 'hello' + myId);
            socket.emit('AAA', 'WTF' + myId);
        })


      });
}

module.exports = app;
