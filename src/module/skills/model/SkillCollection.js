module.exports = function () {
    var SkillReference = function (strRef) {
            var scope = this,
                chunks = strRef.split("."),
                name = chunks.shift(),
                descRef = chunks.join(".");

            this.getName = function () {return name; };
            this.getDescendentReference = function () {return descRef; };
        },
        SkillNode,
        SkillCollection = function () {
            var scope = this;

            this.skills = { };

            this.setNode = function (reference) {
                var node = scope.find(reference);
                if (!node) {
                    // The node for the reference does not exist.
                    // Check for the child node
                    var skillRef = new SkillReference(reference),
                    var child = scope.find(skillRef.getName());
                    if (!child) {
                        // If the child does not exist, create it.
                        child = new SkillNode(name);
                        scope.skills[name] = child;
                    }

                    // Set the node from the child.
                    node = child.getCollection().setNode(skillRef.getDescendentReference());
                }
                return node;
            };
            this.find = function (reference) {
                var node,
                    skillRef = new SkillReference(reference),
                    child = scope.skills[skillRef.getName()];

                if (child) {
                    node = child.getCollection().find(skillRef.getDescendentReference());
                }
                return node;
            };
        };

    SkillNode = require("./SkillNode")(SkillCollection);

    return SkillCollection;
};