angular.module("skill").controller("skill.controller.tree", [

    "$rootScope",
    "$scope",
    "$state",
    "skill.service.navigation",

    function ($rootScope, $scope, $state, navigation) {

        "use strict";

        var stateChange = function () {
            if ($state.current.name === "container.skills") {
                navigation.setPath($state.params.skill);
            }
        };

        $scope.navigation = navigation;
        stateChange();
        $rootScope.$on("$stateChangeSuccess", stateChange);
    }
]);
