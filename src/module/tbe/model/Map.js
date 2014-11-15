module.exports = function () {
    "use strict";

    var Tile = require("./Tile"),

        battle,
        tiles = { };

    this.battle = function (value) {
        if (value) {battle = value; }
        return battle;
    };

    this.tile = function (x, y) {
        var idx = x + "-" + y,
            tile = tiles[idx];

        if (!tile) {
            tile = new Tile();
            tiles[idx] = tile;
        }

        return tile;
    };

    // Allow for expansion.
};