module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        BattleModel = require("../schema").Battle.newModel();

    return function () {
        var scope = this,
            battleFactory = "(unknown-battle-factory)",
            participants = [ ],
            map;

        this.save = function (success, error) {
            error = error || function (err) {
                grunt.log.writeln("tbe.model.Battle - error with no callback:",
                    err.message,
                    err.error
                    );
            };

            // Get the Battle model
            BattleModel.findOne({}, function (err, model) {
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
                        success(model);
                    }
                });
            });

            // Set it up in line with this battle.
            // Save it.
        };
        this.set = function (model) {
            // Sets Battle properties to be what the model has.
            // This will include all characters involved and battle 
                // factory name.
            battleFactory = model.battle_factory;
            return battleFactory;
        };
        this.map = function (value) {
            if (value) {map = value; }
            return map;
        };
        this.view = function () {
            return {
                map: this.map().view()
            };
        };
    };
}());
