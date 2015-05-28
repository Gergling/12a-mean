angular.module("authenticate").service("authenticate.service.core", [

    "$q",
    "Restangular",

    function ($q, Restangular) {
        "use strict";

        var scope = this,
            user = Restangular.one('user'),
            authenticated = false;

        this.userRoute = function () {return user; };

        this.update = function () {
            var deferred = $q.defer();

            user.get().then(function (response) {
                authenticated = Object.keys(response).length > 0;
                deferred.resolve(scope);
            });

            return deferred.promise;
        };

        this.authenticated = function () {return authenticated; };
    }
]);
