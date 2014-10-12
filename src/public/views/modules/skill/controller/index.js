ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",
        "skill.service.tree",
        "skill.service.navigation",

        function ($scope, skillTree, navigation) {
            $scope.navigation = navigation;
            $scope.skillTree = skillTree;
            console.log(skillTree);
        }
    ]);
});
