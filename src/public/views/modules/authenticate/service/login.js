angular.module("authenticate").service("authenticate.service.login", [

    "$q",
    "Restangular",
    "authenticate.service.core",

    function ($q, Restangular, core) {
        "use strict";

        var login = Restangular.all('login'),
            redirect = '/';

        this.redirect = function (value) {
            if (value) {redirect = value; }
            return redirect;
        };

        this.submit = function (params) {
            return $q.all([
                login.post(params),
                core.update()
            ]);
        }
    }
]);
