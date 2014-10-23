ngModules.get("skill").component(function (ngm, mod) {
    "use strict";

    ngm.service(mod.getModuleName("service", "tree"), [

        "Restangular",

        function (Restangular) {
            var skills = Restangular.one("skills"),
                scope = this,
                SkillNode = function (props) {
                    var name = props.name || "",
                        description = props.description,
                        level = props.level,
                        trainingHours = props.trainingHours,
                        children = { };

                    angular.forEach(props.children, function (childData) {
                        children[childData.name] = new SkillNode(childData);
                    });

                    this.name = function () {return name; };
                    this.description = function () {return description; };
                    this.level = function () {return level; };
                    this.getProgress = function () {
                        var progress = 0;
                        if (level > 0) {
                            progress = trainingHours * 100 / level;
                        }
                        return progress;
                    };
                    this.getChildren = function () {return children; };

                    this.find = function (reference) {
                        //var childName = reference.slice(0).shift(),
                        var childName = reference.shift(),
                            child = children[childName],
                            node;
                        if (reference.length > 1) {
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
                        console.log(1, tree.children);
                        scope.loading = false;
                        scope.loaded = true;
                        scope.root = new SkillNode({children: tree.children});
                    });
                };

            this.loading = false;
            this.loaded = false;
            //this.root = new SkillNode();

            this.get = function (reference) {
                var node = scope.root.find(reference);
                console.log(2, reference, node);
                return node;
            };

            fetch();
        }
    ]);
});
