angular.module("skill").controller("skill.controller.tree", [

    "$rootScope",
    "$scope",
    "$state",
    "skill.service.navigation",

    function ($rootScope, $scope, $state, navigation) {

        "use strict";

        var stateChange = function () {
            if ([ "container.skills", "container.skill-tree" ].indexOf($state.current.name) > -1) {
                navigation.setPath($state.params.skill);
            }
        };

        $scope.navigation = navigation;
        stateChange();
        $rootScope.$on("$stateChangeSuccess", stateChange);
    }
]);
