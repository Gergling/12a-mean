ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "tree"), [

        "Restangular",

        function (Restangular) {
            var skills = Restangular.one("skills"),
                scope = this,
                fetch = function () {
                    scope.loading = true;
                    skills.get().then(function (tree) {
                        scope.loading = false;
                        scope.root.set(tree);
                    });
                },
                SkillCollection = function () {
                    var scope = this;
                    this.skills = { };
                    this.set = function (skills) {
                        var name, configNode;
                        for(name in skills) {
                            configNode = skills[name];
                            if (configNode) {
                                scope.skills[name] = new SkillNode();
                                scope.skills[name].set(name, configNode);
                            }
                        }
                    };
                    this.find = function (reference) {
                        var name = reference.shift(),
                            node;
                        if (reference.length > 1) {
                            if (scope.skills[name]) {
                                node = scope.skills[name].collection.find(reference);
                            } else {
                                throw new Error("skill.service.tree: No such skill '" + reference.join(".") + "'");
                            }
                        } else {
                            node = scope.skills[name]
                        }

                        return node;
                    };
                },
                SkillNode = function () {
                    this.collection = new SkillCollection();

                    this.set = function (name, nodeConfig) {
                        scope.name = name;
                        scope.label = nodeConfig.label || name.charAt(0).toUpperCase() + name.slice(1);
                        scope.description = nodeConfig.description;

                        if (nodeConfig.skills) {
                            scope.collection.set(nodeConfig.skills);
                        }
                    };
                };

            this.loading = false;
            this.root = new SkillCollection();

            this.get = function (reference) {
                return scope.root.find(reference);
            };

            fetch();
        }
    ]);
});
