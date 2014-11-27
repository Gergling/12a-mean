module.exports = function () {
    "use strict";

    var Character = require("../model/Character"),
        generator;

    this.generator = function (value) {
        if (value) {
            if (typeof value === "function") {
                generator = value;
            } else {
                throw new Error("tbe.factory.Character.generator(): "
                    + "Parameter must be a function, "
                    + (typeof value) + " found");
            }
        }
        return generator;
    };

    this.generate = function (args) {
        var character = new Character();
        generator(character, args);
        return character;
    };
};
