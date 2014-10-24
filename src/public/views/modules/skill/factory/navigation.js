ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "navigation"), [

        "skill.service.tree",

        function (tree) {
            var path, scope = this;

            this.setPath = function (newPath) {
                path = newPath;
                scope.breadcrumbs = [ {name: "root", label: "Skills", url: "#/skills/"} ];
                tree.promise().then(function () {
                    if (path) {
                        var breadcrumbNames = path.split("/"),
                            reference = [ ];

                        angular.forEach(breadcrumbNames, function (name) {
                            var node;
                            if (name) {
                                reference.push(name);
                                node = tree.get(angular.copy(reference));
                                node.description = "(This skill has no description. Maybe it's just too abstract to understand.)";
                                scope.breadcrumbs.push(node);
                                scope.skill = node;
                            }
                        });
                    } else {
                        scope.skill = tree.root;
                    }
                });
            };            
        }
    ]);
});
