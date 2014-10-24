module.exports = function () {
    "use strict";

    var extend = require("deep-extend"),
        SkillReference = function (strRef) {
            var chunks = strRef.split("."),
                name = chunks.shift(),
                descRef = chunks.join(".");

            this.getName = function () {return name; };
            this.getDescendentReference = function () {return descRef; };
        },
        SkillNode = function (name, props) {
            var scope = this,
                children = { },
                trainingHours = 0,
                level = 0;

            props = extend({
                description: ""
            }, props);

            this.getName = function () {return name; };
            this.set = function (strRef) {
                return scope.traverse(strRef, false);
            };
            this.find = function (strRef) {
                return scope.traverse(strRef, true);
            };

            this.traverse = function (strRef, getter) {
                var reference = new SkillReference(strRef),
                    childName = reference.getName(),
                    descRef = reference.getDescendentReference(),
                    child = children[childName],
                    node;

                if (!child) {
                    if (getter) {
                        throw new Error("Node named '"
                            + name
                            + "' has no child named '"
                            + childName + "'");
                    }
                    child = new SkillNode(childName);
                    children[childName] = child;
                }
                if (!descRef) {
                    node = child;
                } else {
                    node = child.traverse(descRef, getter);
                }
                return node;
            };
            this.getTree = function () {
                var tree = {
                    name: name,
                    description: props.description,
                    trainingHours: trainingHours,
                    level: level,
                    label: "",
                    children: {}
                };
                if (name) {
                    tree.label = name.charAt(0).toUpperCase() + name.slice(1);
                }
                Object.keys(children).forEach(function (childName) {
                    tree.children[childName] = children[childName].getTree();
                });
                return tree;
            };

            this.getTrainingHours = function () {return trainingHours; };
            this.getTotalTrainingHours = function () {
                return (Math.pow(level, 2) / 2)
                    + (level / 2)
                    + trainingHours;
            };
            this.getLevel = function () {return level; };
            this.train = function () {
                trainingHours += 1;
                if (trainingHours >= level + 1) {
                    level += 1;
                    trainingHours -= level;
                }
            };

            this.load = function (model) {
                
            };
        };

    return SkillNode;
};