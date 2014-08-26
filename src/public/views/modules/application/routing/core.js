ngModules.get("application").component("routing", "core", function(mod, ngm) {
    ngm.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'modules/' + mod.getPartialUrl('index')});
    }]);
    ngm.controller([function() {
        
    }]);
});
