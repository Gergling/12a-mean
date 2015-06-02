// Todo: Use state provider instead of routeprovider.
angular.module('application').config([

    //"$routeProvider",
    "$stateProvider",
    "$urlRouterProvider",

    function (/*$routeProvider, */$stateProvider, $urlRouterProvider) {

        "use strict";

        /*var getPartialUrl = function (name) {return 'modules/application/partial/' + name + '.html'; },
            routes = {
                '/': {redirectTo: "/mess/"},
                '/mess/': {partial: getPartialUrl('index'), name: "mess"},
                '/cargo-bay/': {partial: 'modules/test/partial/test.html', name: "cargo-bay"},
                '/bridge/': {partial: 'modules/quest/partial/quests.html', name: "bridge"},
                '/skills/': {partial: 'modules/skill/partial/skills.html', name: "skills"},
                '/register/': {partial: 'modules/authenticate/partial/register.html', name: "register"},
                '/login/': {partial: 'modules/authenticate/partial/login.html', name: "login"}
            };

        routes['/bridge/battle/'] = angular.copy(routes['/bridge/']);
        routes['/bridge/battle/'].partial = "modules/battle/partial/battle.html";

        routes['/skills/:skill*'] = routes['/skills/'];

        angular.forEach(routes, function (obj, route) {
            obj.templateUrl = getPartialUrl('container');
            $routeProvider.when(route, obj);
        });
        $routeProvider.otherwise({templateUrl: getPartialUrl('container'), partial: getPartialUrl('404')});
        */

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
            .state('container.skills', {
                url: "/skills/*skill",
                templateUrl: "modules/skill/partial/skills.html"
            })
            .state('container.quests', {
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

        //$urlRouterProvider.otherwise('/');
    }
])
.controller("application.controller.index", [

    "$rootScope",
    "application.service.primary-navigation",
    //"skill.service.navigation",
    "$state",

    function ($scope, navigation, /*skillNavigation, */$state) {
        $scope.navigation = navigation;
        /*$scope.$on("$routeChangeStart", function (event, next) {
            $scope.routeTemplateUrl = next.partial;
            navigation.setActive(next.name);

            // Todo: Use state name
            if (next.name === "skills") {
                skillNavigation.setPath(next.params.skill);
            }
        });*/
        console.log($state.get());
        $scope.$on("$stateChangeStart", function (event, next) {
            console.log($state.current);
        });
    }
]);
