ngModules.get("test").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "test1"), [

        "$scope",
        "$http",

        function ($scope, $http) {
            $scope.state = { };
            $scope.attack = function () {
                $http.post('/test', {ability_id: 1, source_id: 1, target_id: 2}).success(function (response) {
                    $scope.state = response.game_state;
                });
                // 1, "Send ability id, source character id, target character id to API");
                // 2, "Backend runs ability, which currently just increases the target health by 1");
                // 3, "API response is put through to a game state object on the frontend");
            };

            $scope.battle = { };
            $scope.startBattle = function () {
                $http.post('/battle', {battle_factory: "surveillance"}).success(function (response) {
                    $scope.battle = response;
                });
            };
        }
    ]);
});
