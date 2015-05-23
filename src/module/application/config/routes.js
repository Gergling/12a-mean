module.exports = function (app, controllers) {
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

                        app.param(paramName, function (req, res, next, name) {
                            if (regex.test(name)) {
                                next();
                            } else {
                                next('route');
                            }
                        });
                    });
                }
                console.log(url, functionName, controller, controllerPath, controller[functionName]);
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
    app.get('/battle', function (req, res) {
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
    });

    // PUT /battle casts an ability
    app.param('abilityName', function (req, res, next, name) {
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
    });

    // POST /battle starts a new battle.
    app.post('/battle', function (req, res) {
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
    });

    app.get('/skills', function (req, res) {
        res.send(require("../../skills/config/tree")());
    });

    app.get('/quests', function (req, res) {
        // Todo: Put a delay in here to test quests page loading output.
        res.send(controllers.quests.list());
    });
    app.param('questId', function (req, res, next, name) {
        var regex = new RegExp(/^[0-9]$/);
        if (regex.test(name)) {
            next();
        } else {
            next('route');
        }
    });
    app.post('/quests', function (req, res) {
        res.send(controllers.quests.startMission(req.params.questId));
    });

    // Frontend
    app.get('/', function (req, res) {
        res.sendFile('public/index.html');
    });

    // Everything else
    app.get('*', function (req, res) {
        res.send("404'd");
        res.status(404).end();
    });

};