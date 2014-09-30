ngModules.get("application").component(function (ngm, mod) {
    "use strict";

    ngm.config(['$routeProvider', function ($routeProvider) {
        var getPartialUrl = function (name) {return 'modules/' + mod.getPartialUrl(name); };

        var routes = {
            '/': {redirectTo: "/mess/"},
            '/mess/': {partial: getPartialUrl('index'), name: "mess"},
            '/cargo-bay/': {partial: 'modules/test/partial/test.html', name: "cargo-bay"},
            '/bridge/': {partial: 'modules/battle/partial/battle.html', name: "bridge"}
        };
        angular.forEach(routes, function (obj, route) {
            obj.templateUrl = getPartialUrl('container');
            $routeProvider.when(route, obj);
        });
        $routeProvider.otherwise({templateUrl: getPartialUrl('container'), partial: getPartialUrl('404')});
    }]);
    ngm.controller(mod.getModuleName("controller", "index"), [

        "$rootScope",
        "application.service.primary-navigation",

        function ($scope, navigation) {
            $scope.navigation = navigation;
            $scope.$on("$routeChangeStart", function (event, next, current) {
                $scope.routeTemplateUrl = next.partial;
                navigation.setActive(next.name);
            });
        }
    ]);
});
