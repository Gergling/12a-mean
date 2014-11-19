module.exports = function () {
    var Battle = require("../model/Battle"),
        generator;

    this.generator = function (value) {
        if (value) {generator = value;}
        return generator;
    };

    this.generate = function (args) {
        var battle = new Battle();
        generator(battle, args);
        return battle;
    };
};
