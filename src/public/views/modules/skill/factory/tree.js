ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "tree"), [

        "$q",
        "Restangular",

        function ($q, Restangular) {
            var skills = Restangular.one("skills"),
                scope = this,
                deferred = $q.defer(),
                SkillNode = function (props) {
                    var snScope = this;
                    this.name = "root";
                    angular.forEach(props, function (prop, name) {
                        snScope[name] = prop;
                    });
                    snScope.children = { };
                    if (snScope.parentUrl) {
                        snScope.url = snScope.parentUrl + props.name + "/";
                    }

                    angular.forEach(props.children, function (childData) {
                        childData.parentUrl = snScope.url;
                        snScope.children[childData.name] = new SkillNode(childData);
                    });

                    this.getProgress = function () {
                        var progress = 0;
                        if (level > 0) {
                            progress = trainingHours * 100 / level;
                        }
                        return progress;
                    };

                    this.find = function (reference) {
                        var childName = reference.shift(),
                            child = snScope.children[childName],
                            node;

                        if (reference.length) {
                            if (child) {
                                node = child.find(reference);
                            } else {
                                throw new Error("skill.service.tree: No such skill '" + reference.join(".") + "'");
                            }
                        } else {
                            node = child;
                        }

                        return node;
                    };
                },
                fetch = function () {
                    scope.loading = true;
                    skills.get().then(function (tree) {
                        scope.loading = false;
                        scope.loaded = true;
                        scope.root = new SkillNode({children: tree.children, url: "#/skills/"});
                        deferred.resolve(scope.root);
                    });
                };

            this.loading = false;
            this.loaded = false;
            this.promise = function () {return deferred.promise; };

            this.get = function (reference) {
                var node;
                if (scope.root) {
                    node = scope.root.find(reference);
                }
                return node;
            };

            fetch();
        }
    ]);
});
