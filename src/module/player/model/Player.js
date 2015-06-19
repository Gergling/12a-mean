module.exports = (function () {

    "use strict";

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var SkillSchema = require("../../skill/db/SkillSchema");

    return mongoose.model('Player', {
        userId: String,
        name: String,
        characters: [
            new Schema({
                name: String,
                skills: [ SkillSchema ]
            })
        ]
    });
}());
