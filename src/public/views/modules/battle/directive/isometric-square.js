ngModules.get("battle").component(function (ngm, mod) {
    "use strict";

    ngm.directive("battleIsometricSquare", function () {
        return {
            restrict: "A",
            scope: {x: "@", y: "@", width: "@", height: "@"},
            templateUrl: 'modules/' + mod.getPartialUrl("isometric-square"),
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
});
