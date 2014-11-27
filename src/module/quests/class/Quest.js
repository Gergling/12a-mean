module.exports = function () {
    "use strict";

    var Battle = require("../tbe/model/Battle"),
        MapFactorySquare = require("../tbe/factory/MapFactorySquare"),
        battle;

    // Quest has a battle attached to it.
    this.battle = function (value) {
        if (value) {battle = value; }
        return battle;
    };

    // Quest needs to evaluate the status of the battle for completion.
    // When complete, the player is rewarded.
    this.generateBattle = function () {
        // Temporary function to generate a battle.
        var mapFactory = new MapFactorySquare();

        this.battle(new Battle());
        this.battle().map(mapFactory.generate());
    };

    this.view = function () {
        return {
            battle: this.battle().view()
        };
    };
};
