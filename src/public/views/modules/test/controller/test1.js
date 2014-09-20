ngModules.get("test").component("test1", function(ngm, mod) {
    ngm.controller("test.controller.test1", ["$rootScope", function($scope) {
        $scope.attack = function () {
            console.log(1, "Send ability id, source character id, target character id to API");
            console.log(2, "Backend runs ability, which currently just decreases the target health by 1");
            console.log(3, "API response is put through to a game state object on the frontend");
        };
    }]);
});
