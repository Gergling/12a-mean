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
        SkillNode = function (name) {
            var scope = this,
                children = { },
                trainingHours = 0,
                level = 0,
                description = "",
                model;

            this.getName = function () {return name; };
            this.description = function (desc) {
                if (typeof desc === "string") {description = desc; }
                return description;
            };
            this.getChild = function (childName) {
                return children[childName];
            };
            this.children = function () {return children; };
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
                    description: scope.description,
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
            this.getTotalDescendentTrainingHours = function () {
                var hours = scope.getTotalTrainingHours();
                Object.keys(children).forEach(function (childName) {
                    hours += scope.getChild(childName)
                        .getTotalDescendentTrainingHours();
                });
                return hours;
            };
            this.getLevel = function () {return level; };
            this.train = function () {
                trainingHours += 1;
                if (trainingHours >= level + 1) {
                    level += 1;
                    trainingHours -= level;
                }
            };

            this.load = function (newModel) {
                model = newModel;
                trainingHours = model.trainingHours || 0;
                level = model.level || 0;
                model.children.forEach(function (childModel) {
                    var childName = childModel.name,
                        child = scope.getChild(childName),
                        hours = 0;

                    if (child) {
                        child.load(childModel);
                    } else {
                        // Not an official child. 
                        // Maybe skills have restructured.
                        // Add the total descendent training 
                        // hours to the player total.
                        hours = scope.getTotalDescendentTrainingHours();
                        // Load player model.
                        // Add training hours.
                        // Save player model.
                        // Remove the child skill model.
                    }
                });
            };
            this.save = function () {
                
            };
        };

    return SkillNode;
};