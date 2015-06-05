angular.module("skill").service("skill.service.navigation", [

    "skill.service.tree",

    function (tree) {

        "use strict";

        var path, scope = this;

        this.setPath = function (newPath) {
            path = newPath;
            tree.promise().then(function () {
                scope.breadcrumbs = [ { name: "root", label: "Skills", url: "#/skills/", sref: "container.skill" } ];
                if (path) {
                    var breadcrumbNames = path.split("/"),
                        reference = [ ];

                    angular.forEach(breadcrumbNames, function (name) {
                        var node;
                        if (name) {
                            reference.push(name);
                            node = tree.get(angular.copy(reference));
                            node.description = node.description || "(This skill has no description. Maybe it's just too abstract to understand.)";
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
