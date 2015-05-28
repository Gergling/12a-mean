angular.module("authenticate").service("authenticate.service.register", [

    "authenticate.service.core",

    function (core) {
        "use strict";

        //console.log(core.userRoute());

        this.signup = function (params) {
            //console.log(params, core.userRoute());
            return core.userRoute().put(params).then(function (response) {
                console.log(1, response);
            });
        }
    }
]);
