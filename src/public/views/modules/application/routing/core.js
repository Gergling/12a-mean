ngModules.get("application").component(function (ngm, mod) {
    "use strict";

    ngm.config(['$routeProvider', function ($routeProvider) {
        var getPartialUrl = function (name) {return 'modules/' + mod.getPartialUrl(name); };

        var routes = {
            '/': {partial: getPartialUrl('index')},
            '/test/': {partial: 'modules/test/partial/test.html'},
            '/battle/': {partial: 'modules/battle/partial/battle.html'}
        };
        angular.forEach(routes, function (obj, route) {
            obj.templateUrl = getPartialUrl('container');
            $routeProvider.when(route, obj);
        });
        $routeProvider.otherwise({templateUrl: getPartialUrl('container'), partial: getPartialUrl('404')});
    }]);
    ngm.controller(mod.getModuleName("controller", "index"), ["$rootScope", function ($scope) {
        $scope.$on("$routeChangeStart", function (event, next, current) {
            $scope.routeTemplateUrl = next.partial;
        });
    }]);
});
