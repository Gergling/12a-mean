module.exports = (function () {
    "use strict";

    var BattleModel = require("../loader").schema.Battle.newModel();

    return function () {
        var scope = this,
            battleFactory = "(unknown-battle-factory)",
            participants = [ ],
            map;

        this.save = function (success, error) {
            error = error || function (err) {
                console.error("tbe.model.Battle - error with no callback:", err.message, err.error);
            };

            // Get the Battle model
            Battle.findOne({}, function (err, model) {
                if (!model) {
                    model = new BattleModel({
                        battle_factory: scope.factory,
                        participants: participants
                    });
                }
                model.save(function (err) {
                    if (err) {
                        error({
                            message: "Error creating battle",
                            error: err
                        });
                    } else {
                        success(battle);
                    }
                });
            });

            // Set it up in line with this battle.
            // Save it.
        };
        this.set = function (model) {
            // Sets Battle properties to be what the model has.
            // This will include all characters involved and battle factory name.
            battleFactory = model.battle_factory;
            //scope.
        };
        this.map = function (value) {
            if (value) {map = value; }
            return map;
        };
    };
}());
