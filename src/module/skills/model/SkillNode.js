module.exports = function (SkillCollection) {
    return function () {
        var scope = this;
        this.collection = new SkillCollection();

        this.set = function (name, nodeConfig) {
            scope.name = name;
            scope.label = nodeConfig.label || name.charAt(0).toUpperCase() + name.slice(1);
            scope.description = nodeConfig.description;

            if (nodeConfig.children) {
                scope.collection.set(nodeConfig.children);
            }
        };
    };
};