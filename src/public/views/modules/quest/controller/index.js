ngModules.get("quest").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",
        "$location",
        "quest.service.api",

        function ($scope, $location, api) {
            $scope.quests = [ ];
            $scope.selected = false;
            $scope.select = function (idx) {
                $scope.selected = $scope.quests[idx];
            };

            // Role colours: (for buff icon backgrounds)
            // - Navigator: blue
            // - Engineer: yellow
            // - Intel: light blue
            // - Medic: green
            // - Tactical: red

            api.fetch().then(function (list) {
                $scope.quests = list;
                $scope.status.loaded = true;
            }).finally(function () {
                $scope.status.loading = false;
            });

            $scope.awaitingStartMission = false;
            $scope.successfulStartMission = false;
            $scope.status = {
                loading: true,
                loaded: false,
                startMission: {
                    awaiting: false,
                    successful: false
                }
            };
            $scope.startMission = function (idx) {
                // Send a PUT to quests with the idx for quest acceptance.
                // When successful, redirect to #/bridge/battle/
                $scope.status.startMission.awaiting = true;
                api.startMission(idx).then(function () {
                    $scope.status.startMission.successful = true;
                    $location.path("/bridge/battle/");
                }).finally(function () {
                    $scope.status.startMission.awaiting = false;
                });
            };
        }
    ]);
});
