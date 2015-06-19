module.exports = (function () {
    "use strict";

    var Quest = require("./class/Quest");
    var factory = require("./factory/core");
    var controller = { };

    controller.list = function (req, res) {
        // Return a list of quests that the player is eligible for.
        // List would come from database.
        // In the meantime, we're going to pretend.
        // Also, there were plans for some kind of delay here to test the front end response.
        var quests = [ ];

        if (req) {
            // Ultimately, we will check if the user is authenticated here
            //factory.all(player)
            // Todo: All player quests will come from here, created or existing.
            // Need a list of all available quests.
            // Pass player object to the core, where 
            // At this point, suitable quests will be created for the player.
            // Also need some session information on which player is in use.
            // A user can have multiple players.
            require("./hardcoded-quests").forEach(function (obj) {
                var quest = new Quest(),
                    view;
                quest.context(obj.context);
                quest.type(obj.type);
                quest.label(obj.label);
                quest.description(obj.description);
                view = quest.view();
                view.idx = quests.length; // Todo: Probably just to satisfy the front end.
                quests.push(view);
            });
        }
        res.send(quests);
    };

    controller.startMission = function (req, res) {
        // Get quest.
        // quest.startMission();
        // Report success.
        res.send({ success: false, message: "I would like to tell you the message updated successfully. I'd like to tell you that..." });
    };

    //require('./factories/loader');
    return controller;
}());
