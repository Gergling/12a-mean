module.exports = function (app) {
    "use strict";

    var routes = function (moduleName, list) {
            var controllerPath = "../../" + moduleName + "/controller",
                controller = require(controllerPath);

            list.forEach(function (route) {
                var method = route[0],
                    url = route[1],
                    functionName = route[2],
                    params = route[3],
                    fnc = controller[functionName];

                if (params) {
                    if (params.constructor === [ ].constructor) {
                        params.forEach(function (param) {
                            var paramName = param[0],
                                regex = param[1];

                            /*jslint unparam: true */
                            app.param(paramName, function (req, res, next, name) {
                                if (regex.test(name)) {
                                    next();
                                } else {
                                    next('route');
                                }
                            });
                            /*jslint unparam: false */
                        });
                    } else {
                        throw new Error("Third route element should be an array. '" + params.constructor + "' given.");
                    }
                }
                if (app[method]) {
                    if (fnc) {
                        if (typeof fnc === 'function') {
                            app[method](url, fnc);
                        } else {
                            throw new Error("Routing function parameter '" + controllerPath + "." + functionName + "' should be a function. " + (typeof fnc) + " found.");
                        }
                    } else {
                        throw new Error("No routing function in '" + controllerPath + "' named '" + functionName + "'.");
                    }
                } else {
                    throw new Error("No method function '" + method + "'.");
                }
            });
        };

    routes('battle', [
        [ 'get',    '/battle',                      'current' ],
        [ 'post',   '/battle/turn',                 'turn' ],
        [ 'post',   '/battle/start/:missionId',     'start' ],
        [ 'post',   '/battle/cast/:abilityName',    'cast',
            [
                [ 'abilityName', /^[a-z]$/ ]
            ]
        ]
    ]);

    routes('skill', [
        [ 'get',    '/skill', 'tree' ]
    ]);

    routes('quest', [
        [ 'get',    '/quests',          'list' ],
        [ 'post',   '/quests', 'startMission',
            [
                [ 'questId', /^[0-9a-zA-Z]$/ ]
            ]
        ]
    ]);

    // Frontend
    /*jslint unparam: true */
    app.get('/', function (req, res) {
        res.sendFile('public/index.html');
    });

    // Everything else
    app.get('*', function (req, res) {
        res.send({ error: "404'd", message: "This is not the page you are looking for." });
        res.status(404).end();
    });
    /*jslint unparam: false */

};