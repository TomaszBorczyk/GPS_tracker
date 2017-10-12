const API = require('./server/config/api.config'),
    express = require('express'),
    config = require('./server/config/config'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const port = process.env.PORT || 4567;
const db = process.env.DB_REMOTE || config.db;
let app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

const deviceRouter = require('./server/routes/device.router');

app.use(API.CORE + API.DEVICE, deviceRouter);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

mongoose.connect(db);
if(!module.parent){
    app.listen(port);
}

module.exports = app;
