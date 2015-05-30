angular.module("quest").service("quest.service.api", [

    "Restangular",

    function (Restangular) {

        "use strict";

        var quests = Restangular.all("quests");

        this.fetch = function () {
            return quests.getList();
        };

        this.startMission = function (questId) {
            // Find out how to do a restangular post.
            return quests.post({questId: questId});
        };
        this.all = function () {return quests; };

    }
]);
