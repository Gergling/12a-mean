ngModules.get("application").component(function (ngm, mod) {
    "use strict";

    ngm.config(['$routeProvider', function ($routeProvider) {
        var getPartialUrl = function (name) {return 'modules/' + mod.getPartialUrl(name); };
        $routeProvider.when('/', {templateUrl: getPartialUrl('index')});
        $routeProvider.when('/test/', {templateUrl: 'modules/test/partial/test.html'});
        $routeProvider.otherwise({templateUrl: getPartialUrl('404')});
    }]);
    ngm.controller(mod.getModuleName("controller", "index"), ["$rootScope", function ($scope) {
        $scope.stuff = "oi";
    }]);
});
