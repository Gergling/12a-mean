ngModules.get("application").component("routing", function(ngm, mod) {
    ngm.config(['$routeProvider', function($routeProvider) {
        var getPartialUrl = function (name) {return 'modules/' + mod.getPartialUrl(name);};
        $routeProvider.when('/', {templateUrl: getPartialUrl('index')});
        $routeProvider.when('/test/', {templateUrl: 'modules/test/partial/test.html'});
        $routeProvider.otherwise({templateUrl: getPartialUrl('404')});
    }]);
    ngm.controller("application.controller.index", ["$rootScope", function($scope) {
        $scope.stuff = "oi";
    }]);
});
