module.exports = function () {
    var SkillNode, SkillCollection = function () {
        var scope = this;

        this.skills = {};

        this.set = function (configCollection) {
            var name, configNode;
            for(name in configCollection) {
                configNode = configCollection[name];
                scope.skills[name] = new SkillNode();
                scope.skills[name].set(name, configNode);
            }
        };
        
    };

    SkillNode = require("./SkillNode")(SkillCollection);

    return SkillCollection;
};