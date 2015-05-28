angular.module("authenticate").directive("password", function () {
    "use strict";

    return {
        scope: { password: "=" },
        templateUrl: "modules/authenticate/partial/directive-password.html",
        controller: [

            "$scope",

            function ($scope) {
                $scope.show = false;
                $scope.toggle = function () {
                    $scope.show = !$scope.show;
                };
            }
        ]
    };
});
