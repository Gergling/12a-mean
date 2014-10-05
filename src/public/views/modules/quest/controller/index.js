ngModules.get("quest").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",

        function ($scope) {
            $scope.quests = [ ];
            for(var i = 0; i < 5; i++) {
                $scope.quests.push({label: "Quest " + i});
            }
        }
    ]);
});
