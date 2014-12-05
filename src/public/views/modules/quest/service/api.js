ngModules.get("quest").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "api"), [

        "Restangular",

        function (Restangular) {
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
});
