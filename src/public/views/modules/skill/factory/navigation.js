ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "navigation"), [

        "skill.service.tree",

        function (tree) {
            var path, scope = this;

            this.setPath = function (newPath) {
                path = newPath;
                scope.breadcrumbs = [ {name: "root", label: "Root"} ];
                if (path) {
                    var breadcrumbNames = path.split("/"),
                        reference = [ ];
                    angular.forEach(breadcrumbNames, function (name) {
                        reference.push(name);
                        scope.breadcrumbs.push(tree.get(reference));
                    });
                }
            };

            //this.getSkillName = function
            //this.breadcrumbs = [ ];
            // Set breadcrumbs according to ancestor skills.
            // Set node. Get children from node.
            
        }
    ]);
});
