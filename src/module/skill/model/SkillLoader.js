module.exports = function () {
    "use strict";

    var playerSkills = require("./SkillModel")(),
        skillTree = require("../config/tree");

    return function () {
        var playerRoot = playerSkills.findOne();
        skillTree.load(playerRoot);
    };
};