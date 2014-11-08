angular.module("battle").directive("battleIsometricSquare", function () {
    "use strict";

    return {
        restrict: "A",
        scope: {x: "@", y: "@", width: "@", height: "@"},
        templateUrl: 'modules/battle/partial/isometric-square.html',
        controller: [

            "$scope",

            function ($scope) {
                $scope.isometricX = $scope.x * $scope.width;
                $scope.isometricY = $scope.y * $scope.height;
                $scope.character = 3; // An id. This will be used to generate a directive for displaying character models.
            }
        ]
    };
});
