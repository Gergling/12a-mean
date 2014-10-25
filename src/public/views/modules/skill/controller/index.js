ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",
        "skill.service.navigation",

        function ($scope, navigation) {
            $scope.navigation = navigation;
        }
    ]);
});
