ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "navigation"), [

        "skill.service.tree",

        function (tree) {
            var path;

            this.setPath = function (newPath) {
                path = newPath;
            };

            //this.getSkillName = function
            //this.breadcrumbs
            // Set breadcrumbs according to ancestor skills.
            // Set node. Get children from node.
            
        }
    ]);
});
