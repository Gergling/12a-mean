ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",
        "skill.service.tree",

        function ($scope, skillTree) {
            //$scope.breadcrumbs = navigation.
            $scope.skilltree = skillTree;
            console.log(skillTree);
        }
    ]);
});
