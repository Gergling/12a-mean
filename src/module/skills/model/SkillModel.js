module.exports = function () {
    "use strict";

    var mongoose = require("mongoose")
        SkillModel = mongoose.Schema({
            name: String,
            level: Number,
            trainingHours: Number,
            children: [ SkillModel ]
        });

    return mongoose.model("Skill", SkillModel)
};