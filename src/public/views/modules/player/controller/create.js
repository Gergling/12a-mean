angular.module("player").controller("player.controller.create", [

    "$scope",

    "player.service.api",

    function ($scope, api) {
        $scope.player = { };

        $scope.submit = function () {
            api.create($scope.player).then(function () {
                // Redirect to quest list
            });
        };
    }
]);