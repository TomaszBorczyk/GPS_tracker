const express = require('express'),
    config = require('./server/config/config'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const port = process.env.PORT || 4567;
const db = process.env.DB_REMOTE || config.db;
let app = express();

//static folder
app.use(express.static(path.join(__dirname, 'dist')));

//app configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//adding routes
const deviceRouter = require('./server/routes/device.router');

app.use('/api/v1/device', deviceRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//connecting to database and listening on port
mongoose.connect(db);
if(!module.parent){
    app.listen(port);
}

module.exports = app;
