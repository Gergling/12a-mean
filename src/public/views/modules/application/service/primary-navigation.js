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
                //sref: name
            };
            scope.list.push(item);
        };
        this.list = [];

        //setNavItem("mess", "Mess");
        setNavItem("quests", "Bridge");
        //setNavItem("cargo-bay", "Cargo Bay");
        //setNavItem("skills", "Skills", "container.skills({skill: ''})");
        setNavItem("skills", "Skills");

        $rootScope.$on("$stateChangeSuccess", angular.bind(this, function () {
            console.log($state.current.name, $stateParams);
            this.list.forEach(function (item) {
                item.active = item.name === $state.current.name;
            });
        }));
        /*this.setActive = function (name) {
            angular.forEach(scope.list, function (item) {
                if (item.name === name) {
                    item.active = true;
                    scope.active = item;
                } else {
                    item.active = false;
                }
            });
        };*/
    }
]);
