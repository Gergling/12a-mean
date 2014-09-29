ngModules.get("battle").component(function (ngm, mod) {
    "use strict";

    ngm.directive("component-bracket", function () {
        return {
            templateUrl: 'modules/' + mod.getPartialUrl("component-bracket")
        };
    });
});
