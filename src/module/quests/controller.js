module.exports = (function () {
    "use strict";

    var Quest = require("./class/Quest"),
        controller = { };

    controller.get = function () {
        // Return a list of quests that the player is eligible for.
        // List would come from database.
        /// In the meantime, we're going to pretend.
        var quest = new Quest();

        quest.generateBattle();
        return [ quest ];
    };

    return controller;
}());
