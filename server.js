const express = require('express'),
    config = require('./server/config/config'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const port = process.env.PORT || 4567;
let app = express();

//static folder
app.use(express.static(path.join(__dirname, 'dist')));

//app configuration
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


//passport configuration
// let User = require('./server/models/user.model');
// passport.use(new localStrategy(User.authenticate()));


//custom implementation of serialization/deserialization, default one was searching user by username, which is not unique
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

// app.use(passport.initialize());
// app.use(passport.session());


//adding routes

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//connecting to database and listening on port
mongoose.connect(config.db);
if(!module.parent){
    app.listen(port);
}
console.log('App runs in develop mode');

module.exports = app;
