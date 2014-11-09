angular.module("skill").controller("skill.controller.index", [

    "$scope",
    "skill.service.navigation",

    function ($scope, navigation) {
        "use strict";

        $scope.navigation = navigation;
    }
]);
