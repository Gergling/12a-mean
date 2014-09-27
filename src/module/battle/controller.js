module.exports = function (contexts, tbeSchemas, tbe) {
    "use strict";

    var Battle = tbe.Battle,
        BattleModel = tbeSchemas.Battle.model,
        fetchBattle = function (cb) {
            BattleModel.findOne({}, function (err, battle) {
                cb(err, battle);
            });
        };

    var bc = { };
    bc.start = function (contextName, battleFactoryName, player_id, success, error) {
        // Validate battleFactoryName and player_id.
        // Ensure that there is no existing battle first. Find a good place to request the existence of a battle.
        // Get context
        // Get battle factory
        var context = contexts[contextName],
            battleFactory = context.getBattleFactory(battleFactoryName);

        fetchBattle(function (err, battleModel) {
            var battle;
            if (!battleModel) {
                // No current battle
                // Generate battle
                // Ultimately this will require details of the player, but for now we're just going to create the battle.
                battle = battleFactory.generate();
                // Save battle
                battle.save();
            } else {
                battle = new Battle();
                battle.set(battleModel);
            }
        });

        /*Battle.findOne({}, function (err, battle) {
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
        });*/

        // If valid, return 200. If invalid, return appropriate code.
        return { };
    };
    bc.get = function (player_id) {
        // Player can only be in one battle at a time, so check it.
        // Get battle state.
    };

    return bc;
};
