// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var db = require('./src/config/db');

var schemas = {
    tbe: require('./src/module/tbe/schema')(mongoose)
};

// controllers
var controllers = {
    battle: require("./src/module/battle/controller")(schemas.tbe)
};

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request.
// simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static('./src/public/views'));

// routes ==================================================
require('./src/app/routes')(app, schemas.tbe, controllers, mongoose);

// start app ===============================================
app.listen(port); // startup our app at http://localhost:8080

console.log('Magic happens on port ' + port); // shoutout to the user


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;
