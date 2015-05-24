ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "tree"), [

        "$q",
        "Restangular",

        function ($q, Restangular) {
            var skills = Restangular.one("skill"),
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
                        childData.parent = snScope;
                        snScope.children[childData.name] = new SkillNode(childData);
                    });

                    this.getProgress = function () {
                        var progress = 0;
                        if (snScope.level > 0) {
                            progress = snScope.trainingHours * 100 / snScope.level;
                        }
                        return progress;
                    };
                    this.getFullReference = function () {
                        var reference = this.name;
                        if (snScope.parent) {
                            reference = [ this.parent.getFullReference(), reference ].join(".");
                        }
                        return reference;
                    };

                    this.find = function (reference) {
                        var childName = reference.shift(),
                            child = snScope.children[childName],
                            node,
                            snNonExistent = function () {
                                return new SkillNode({
                                    name: childName,
                                    label: "(Not a skill)",
                                    level: 0,
                                    trainingHours: 0,
                                    description: "There is no such skill as '" + [ snScope.getFullReference(), childName ].join(".") + "', and if there is, people probably shouldn't be trained in it."
                                });
                            };

                        if (reference.length) {
                            if (child) {
                                node = child.find(reference);
                            } else {
                                node = snNonExistent();
                            }
                        } else {
                            if (child) {
                                node = child;
                            } else {
                                node = snNonExistent();
                            }
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
