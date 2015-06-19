angular.module("application").service("application.service.primary-navigation", [

    "$rootScope",
    "$state",
    "$stateParams",

    function ($rootScope, $state, $stateParams) {

        "use strict";

        var scope = this, setNavItem = function (name, label, sref) {
            var item = {
                name: name,
                label: label,
                sref: sref || 'container.' + name
            };
            scope.list.push(item);
        };
        this.list = [];

        setNavItem("player.quests", "Bridge");
        setNavItem("player.skills", "Skills");

        $rootScope.$on("$stateChangeSuccess", angular.bind(this, function () {
            this.list.forEach(function (item) {
                item.active = item.sref === $state.current.name;
            });
        }));
    }
]);
