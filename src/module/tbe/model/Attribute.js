module.exports = function () {
    "use strict";

    var description;

    this.description = function (value) {
        if (value) {description = value; }
        return description;
    };
};
