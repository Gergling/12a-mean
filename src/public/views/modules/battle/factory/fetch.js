angular.module("battle").service("battle.service.fetch", [

    "$http",

    function ($http) {
        "use strict";

        this.state = function () {
            return $http.get('/battle');
        };
    }
]);
