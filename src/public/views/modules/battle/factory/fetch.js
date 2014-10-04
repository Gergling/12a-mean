ngModules.get("battle").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "fetch"), [

        "$http",

        function ($http) {
            this.state = function () {
                return $http.get('/battle');
            };
        }
    ]);
});
