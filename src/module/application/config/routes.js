module.exports = function (app) {
    "use strict";

    var routes = function (controllerPath, list) {
            var controller = require(controllerPath);
            list.forEach(function (route) {
                var method = route[0],
                    url = route[1],
                    functionName = route[2],
                    params = route[3];

                if (params) {
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
                }
                app[method](url, controller[functionName]);
            });
        };

    routes('../../battle/controller', [
        [ 'get',    '/battle',                      'current' ],
        [ 'post',   '/battle/turn',                 'turn' ],
        [ 'post',   '/battle/start/:missionId',     'start' ],
        [ 'post',   '/battle/cast/:abilityName',    'cast',
                [ 'abilityName', /^[a-z]$/ ]
            ]
    ]);

    // GET /battle returns the state of the current battle
    /*app.get('/battle', function (req, res) {
        var player_id = 1;
        if (player_id) {
            controllers.battle.get(
                player_id,
                function (battle) {
                    res.send(battle);
                },
                function (err) {
                    res.send(err);
                    //res.status(500).end();
                }
            );
        } else {
            res.send();
            res.status(403).end();
        }
    });*/
    // POST /battle/start/:mission-id
    // - Starts a new battle based on the mission

    // POST /battle/cast/:ability-id
    // - Uses an ability
    // - Body contains various ability details

    // POST /battle/turn
    // - Turns the game

    // PUT /battle casts an ability
    /*app.param('abilityName', function (req, res, next, name) {
        var regex = new RegExp(/^[a-z]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });
    app.put('/battle/:abilityName', function (req, res) {
        var player_id = 1;
        if (player_id) {
            controllers.battle.ability(
                player_id,
                req.params.abilityName,
                req.query // Controller to sanitise.
            ).then(function () {
                res.send({ });
            }, function (error) {
                switch (error.type) {
                case "malformed":
                    res.status(400).send(error.query);
                    break;
                case "unavailable":
                    res.status(403).end();
                    break;
                case "nonexistent":
                    res.status(404).end();
                    break;
                default:
                    res.status(500).end();
                }
            });
        } else {
            res.status(401).end();
        }
    });*/

    // POST /battle starts a new battle.
    /*app.post('/battle', function (req, res) {
        // Will need to check for authentication.
        // If authentication successful, populate player_id
        var player_id = 1;
        if (player_id) {
            controllers.battle.start(
                "space-intel", // context
                req.param("battle_factory"),
                player_id,
                function (battle) {
                    // Catch error and send as appropriate error message.
                    res.send(battle);
                },
                function (err) {
                    res.send(err);
                    //res.status(401).end();
                }
            );
        } else {
            res.send();
            res.status(403).end();
        }
    });*/

    routes('../../skills/controller', [
        [ 'get',    '/skills', 'tree' ]
    ]);

    routes('../../quest/controller', [
        [ 'get',    '/quests',          'list' ],
        [ 'post',   '/quests/:questId', 'startMission',
                [ 'questId', /^[0-9a-zA-Z]$/ ]
            ]
    ]);

    /*app.get('/quests', function (req, res) {
        res.send(controllers.quests.list());
    });*/
    /*app.param('questId', function (req, res, next, name) {
        var regex = new RegExp(/^[0-9]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });
    app.post('/quests', function (req, res) {
        res.send(controllers.quests.startMission(req.params.questId));
    });*/

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