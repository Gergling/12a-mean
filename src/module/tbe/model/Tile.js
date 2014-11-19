module.exports = function () {
    "use strict";

    var x = 0, y = 0, map;

    this.map = function (value) {
        if (value) {map = value; }
        return map;
    };
    this.x = function (value) {
        if (value || value === 0) {x = value; }
        return x;
    };
    this.y = function (value) {
        if (value || value === 0) {y = value; }
        return y;
    };

    this.character = function () {
        // Sets and gets the character at this tile.
        // Need to handle case where multiple characters can inhabit the same tile.
        return true;
    };
};
