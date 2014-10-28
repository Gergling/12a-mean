module.exports = function (app, tbeSchemas, controllers, mongoose) {
    "use strict";

    var Character = tbeSchemas.Character.model;

    app.post('/test', function (req, res) {
        Character.findOne({id: 2}, function (err, character) {
            if (!character) {
                // create
                character = new Character({id: 2, health: 0});
            }
            character.health += 1;
            character.save(function (err) {
                if (err) {
                    console.log('error saving character');
                    console.log(err);
                }
            });

            res.send({
                game_state: {
                    battle_id: 1,
                    characters: {
                        2: {health: character.health}
                    }
                }
            });
        });
    });

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
    app.param('abilityName', /^[a-z]$/);
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

    //app.get('/quest/:id', function (req, res) {
        //res.sendFile(req.param("id")
    //});

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