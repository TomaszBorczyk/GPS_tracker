const API = require('./server/config/api.config'),
    express = require('express'),
    config = require('./server/config/config'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    session = require('express-session');

const User = require('./server/models/user.model');
const port = process.env.PORT || config.port;
const db = process.env.DB_REMOTE || config.db;
const app = express();
const deviceRouter = require('./server/routes/device.router');
const userRouter = require('./server/routes/user.router');


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

mongoose.connect(db);
if(!module.parent){
    app.listen(port);
}

module.exports = app;
