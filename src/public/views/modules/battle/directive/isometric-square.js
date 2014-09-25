ngModules.get("battle").component(function (ngm, mod) {
    "use strict";

    ngm.directive("battleIsometricSquare", function () {
        return {
            restrict: "A",
            scope: {x: "@", y: "@", width: "@", height: "@"},
            templateUrl: 'modules/' + mod.getPartialUrl("isometric-square"),
            controller: [

                "$scope",
                "$http",

                function ($scope, $http) {
                    //$scope.width = 100;
                    //$scope.height = 52;
                    $scope.isometricX = $scope.x * $scope.width;
                    $scope.isometricY = $scope.y * $scope.height;
                }
            ]
        };
    });
});
