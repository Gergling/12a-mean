ngModules.get("quest").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "api"), [

        "$q",
        "Restangular",

        function ($q, Restangular) {
            var quests = Restangular.all("quests"),
                scope = this;

            this.loading = false;
            this.loaded = false;

            this.fetch = function () {
                var deferred = $q.defer();
                scope.loading = true;
                quests.getList().then(function (list) {
                    console.log(list);
                    scope.loading = false;
                    scope.loaded = true;
                    deferred.resolve(list);
                });
                return deferred.promise;
            };

            /// POST for start mission.
            this.all = function () {return quests; };

        }
    ]);
});
