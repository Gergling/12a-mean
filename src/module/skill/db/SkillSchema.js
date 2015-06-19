module.exports = function () {
    "use strict";

    var mongoose = require("mongoose"),
        SkillSchema;

    SkillSchema = mongoose.Schema({
        name: String,
        level: Number,
        trainingHours: Number,
        lastTrained: Date,
        children: [ SkillSchema ]
    });

    return SkillSchema;
};
