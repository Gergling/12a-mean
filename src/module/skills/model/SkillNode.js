module.exports = function () {
    var SkillReference = function (strRef) {
            var scope = this,
                chunks = strRef.split("."),
                name = chunks.shift(),
                descRef = chunks.join(".");

            this.getName = function () {return name; };
            this.getDescendentReference = function () {return descRef; };
        },
        SkillNode = function (name) {
            var scope = this,
                children = { },
                trainingHours = 0,
                level = 0;

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
                        throw new Error("Node named '" + name + "' has no child named '" + childName + "'");
                    } else {
                        child = new SkillNode(childName);
                        children[childName] = child;
                    }
                }
                if (!descRef) {
                    node = child;
                } else {
                    node = child.traverse(descRef, getter);
                }
                return node;
            };

            this.getTrainingHours = function () {return trainingHours; };
            this.getTotalTrainingHours = function () {
                return (Math.pow(level, 2) / 2)
                    + (level / 2)
                    + trainingHours;
            };
            this.train = function () {
                trainingHours += 1;
                if (trainingHours >= level + 1) {
                    level += 1;
                    trainingHours -= level;
                }
            };
        };

    return SkillNode;
};