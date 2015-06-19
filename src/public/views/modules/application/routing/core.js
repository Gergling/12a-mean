angular.module('application').config([

    "$stateProvider",
    "$urlRouterProvider",

    function ($stateProvider, $urlRouterProvider) {

        "use strict";

        $stateProvider
            .state('container', {
                abstract: true,
                templateUrl: "modules/application/partial/container.html",
                controller: "application.controller.index"
            })
            .state('container.login', {
                url: "/login",
                templateUrl: "modules/authenticate/partial/login.html"
            })
            .state('container.register', {
                url: "/register",
                templateUrl: "modules/authenticate/partial/register.html"
            })
            .state('container.player-create', {
                url: "/player/create",
                templateUrl: "modules/player/partial/create.html",
                controller: "player.controller.create"
            })
            // Some of these routes (not all) will needed to redirect to login if authentication is non-existent.
            .state('container.player', {
                abstract: true,
                templateUrl: "modules/player/partial/index.html"
            })
            .state('container.player.skills', {
                url: "/skills/",
                templateUrl: "modules/skill/partial/skills.html",
                controller: "skill.controller.tree"
            })
            .state('container.player.skill-tree', {
                url: "/skills/*skill/",
                templateUrl: "modules/skill/partial/skills.html",
                controller: "skill.controller.tree"
            })
            .state('container.player.quests', {
                url: "/bridge",
                templateUrl: "modules/quest/partial/quests.html"
            })
            .state('container.battle', {
                url: "/battle",
                templateUrl: "modules/authenticate/partial/battle.html"
            })
            .state('container.404', {
                url: "/*path",
                templateUrl: "modules/application/partial/404.html"
            });

        $urlRouterProvider.otherwise('/');
    }
])
.controller("application.controller.index", [

    "$rootScope",
    "application.service.primary-navigation",
    "$state",

    function ($scope, navigation) {
        $scope.navigation = navigation;
    }
]);
