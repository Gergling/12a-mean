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
    // PUT /battle casts an ability

    // POST /battle starts a new battle.
    app.post('/battle', function (req, res) {
        // Will need to check for authentication.
        // If authentication successful, populate player_id
        var player_id = 1;
        if (player_id) {
            controllers.battle.start(
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

    // route to handle creating (app.post)
    // route to handle delete (app.delete)

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