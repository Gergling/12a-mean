ngModules.get("quest").component(function (ngm, mod) {
    "use strict";

    ngm.controller(mod.getModuleName("controller", "index"), [

        "$scope",

        function ($scope) {
            $scope.quests = [
                {context: "space-intel", type: "buff", label: "Navigation Feed", description: "Offer the navigator an information feed, such that movement space is increased overall."},
                {context: "space-intel", type: "buff", label: "Tactical Feed", description: "Offer the tactical chief an information feed, such that weapon and defense usage is improved."},
                {context: "space-intel", type: "buff", label: "Environmental Feed", description: "Setup a general feed of the external environment, such that ship systems can be optimised more efficiently."},
                {context: "space-intel", type: "practise", label: "General Astronomy", description: "Look out into the stars and and uncover the mysteries of space. There is the potential for valuable data out there."},
                {context: "space-intel", type: "mission", label: "Scan Mystery Void", description: "There is an unusually empty area of space at {{x}}. {{y}} has asked that you find out what resides there."}
            ];
            $scope.selected = {};
            $scope.select = function (idx) {
                $scope.selected = $scope.quests[idx];
            };
            angular.forEach($scope.quests, function (quest, idx) {
                quest.idx = idx;
            });

            // Role colours: (for buff icon backgrounds)
            // - Navigator: blue
            // - Engineer: yellow
            // - Intel: light blue
            // - Medic: green
            // - Tactical: red
        }
    ]);
});
