angular.module("authenticate").controller("authenticate.controller.login", [

    "$scope",
    "$location",
    "authenticate.service.login",
    "authenticate.service.core",

    function ($scope, $location, login, core) {
        "use strict";

        $scope.login = {
            username: "a@b.c",
            password: "abc"
        };

        // Checking if logged in
        core.update().then(function (a) {
            if (a.authenticated()) {
                $location.path(login.redirect());
            }
        });

        $scope.submit = function () {
            login.submit({
                username: $scope.login.username,
                password: $scope.login.password
            }).then(function (response) {
                $location.path(login.redirect());
            });
        };
    }
]);
