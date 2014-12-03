module.exports = function () {
    "use strict";

    var Battle = require("../../tbe/model/Battle"),
        mapFactory = require("../../tbe/factory/MapFactorySquare"),

        context = "no-context",
        type = "no-type",
        label = "Mystery Quest!",
        description = "This quest is a mystery.",
        battle;

    // Quest has a battle attached to it.
    this.battle = function (value) {
        if (value) {battle = value; }
        return battle;
    };
    this.context = function (value) {
        if (value) {context = value; }
        return context;
    };
    this.type = function (value) {
        if (value) {type = value; }
        return type;
    };
    this.label = function (value) {
        if (value) {label = value; }
        return label;
    };
    this.description = function (value) {
        if (value) {description = value; }
        return description;
    };

    // Quest needs to evaluate the status of the battle for completion.
    // When complete, the player is rewarded.
    this.generateBattle = function () {
        // Temporary function to generate a battle.
        this.battle(new Battle())
            .map(mapFactory.generate());
    };

    this.view = function () {
        return {
            //battle: this.battle().view()
            context: context,
            type: type,
            label: label,
            description: description
            // Needs an id. This will be an id for each 
                // available quest for that player.
        };
    };

    this.startBattle = function () {
        return true;
    };
};
