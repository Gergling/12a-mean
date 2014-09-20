ngModules.get("test").component("test1", function(ngm, mod) {
    ngm.controller("test.controller.test1", [

        "$scope",
        "$http",

        function($scope, $http) {
            $scope.attack = function () {
                $http.post('/test', {ability_id: 1, source_id: 1, target_id: 2}).success(function (response) {
                    console.log(response, response.game_state.characters[2].health);
                });
                console.log(1, "Send ability id, source character id, target character id to API");
                console.log(2, "Backend runs ability, which currently just increases the target health by 1");
                console.log(3, "API response is put through to a game state object on the frontend");
            };
        }
    ]);
});
