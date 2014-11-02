module.exports = (function () {

    "use strict";

    // Vendor Modules =================================================
    var express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),

    // configuration ===========================================

        modPath = "./src/module/",

    // config files
        dbConfig = require(modPath + 'application/config/db'),

        schemas = require(modPath + "application/loader/schemas"),

    // controllers
        controllers = require(modPath + "application/loader/controllers"),

        port = process.env.PORT || 8080; // set our port

    mongoose.connect(dbConfig.url);

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
    require(modPath + 'application/config/routes')(app,
        schemas.tbe, controllers, mongoose);

    // start app ===============================================
    app.listen(port); // startup our app at http://localhost:8080

    console.log('Magic happens on port ' + port); // shoutout to the user


    mongoose.connection.on('error',
        console.error.bind(console, 'connection error:'));

    return app;

}());
