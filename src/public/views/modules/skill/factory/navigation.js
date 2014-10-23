ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "navigation"), [

        "skill.service.tree",

        function (tree) {
            var path, scope = this;

            this.setPath = function (newPath) {
                console.log(newPath);
                path = newPath;
                scope.breadcrumbs = [ {name: "root", label: "Root"} ];
                if (path) {
                    var breadcrumbNames = path.split("/"),
                        reference = [ ];

                    console.log(breadcrumbNames);
                    angular.forEach(breadcrumbNames, function (name) {
                        if (name) {
                            console.log(name);
                            reference.push(name);
                            console.log(1, reference);
                            try {
                                var node = tree.get(reference);
                                console.log(3, node);
                                scope.breadcrumbs.push(node);
                            } catch (e) {
                                
                            }
                        }
                        console.log(scope.breadcrumbs);
                    });
                }
            };

            /*this.getBreadcrumbNames = function () {
                var names = [ ];
                angular.forEach(scope.breadcrumbs, function (breadcrumb) {
                    names.push(breadcrumb.name);
                });
                return names;
            };*/

            //this.getSkillName = function
            //this.breadcrumbs = [ ];
            // Set breadcrumbs according to ancestor skills.
            // Set node. Get children from node.
            
        }
    ]);
});
