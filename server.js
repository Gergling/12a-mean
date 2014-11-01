"use strict";

// Vendor Modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var grunt = require("grunt");
var pathService = require("path");

// configuration ===========================================

// config files
var db = require('./src/module/application/config/db');

/*var schemas = {
    tbe: require('./src/module/tbe/schema')(mongoose)
    //tbe: require(modules.tbe.root + '/schema')(mongoose)
};*/
var schemas = require("./src/module/application/loader/schemas");

var srcModules = {
    tbe: {
        Battle: require('./src/module/tbe/model/Battle')(schemas.tbe),
        Capacitor: require('./src/module/tbe/model/Capacitor')(),
        Context: require('./src/module/tbe/model/Context')()
    }
};

/*var contexts = { };

grunt.file.expand("./src/module/tbe-contexts/*.js").forEach(function (ctx) {
    var modulePath = ctx.replace(".js", ""),
        contextName = pathService.basename(ctx, ".js"),
        context = new srcModules.tbe.Context();

    contexts[contextName] = require(modulePath)(context, srcModules.tbe);
});*/

// controllers
var controllers = require("./src/module/application/loader/controllers");
/*var controllers = {
    battle: require("./src/module/battle/controller")(contexts, schemas.tbe, srcModules.tbe)
};*/

//var contexts = require("./src/module/contexts")();

//require(grunt.file.expand("./src/module/*/tbe-contexts/*"))()

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
require('./src/module/application/config/routes')
    (app, schemas.tbe, controllers, mongoose);

// start app ===============================================
app.listen(port); // startup our app at http://localhost:8080

console.log('Magic happens on port ' + port); // shoutout to the user


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;
