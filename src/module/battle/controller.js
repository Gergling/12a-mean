module.exports = function (tbeSchemas) {
    "use strict";

    var Battle = tbeSchemas.Battle.newModel(), bf = {
        start: function (battleFactoryName, player_id, success, error) {
            // Validate battleFactoryName and player_id.
            Battle.findOne({}, function (err, battle) {
                if (!battle) {
                    battle = new Battle({battle_factory: battleFactoryName});
                    battle.save(function (err) {
                        if (err) {
                            error({
                                message: "Error creating battle",
                                error: err
                            });
                        } else {
                            success(battle);
                        }
                    });
                }
            });

            // If valid, return 200. If invalid, return appropriate code.
            return { };
        },
        get: function (player_id) {
            // Player can only be in one battle at a time, so check it.
            // Get battle state.
        }
    };

    return bf;
};
