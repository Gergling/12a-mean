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
            tile.x(x);
            tile.y(y);
            tiles[idx] = tile;
        }

        return tile;
    };
    this.tiles = function (fnc) {
        Object.keys(tiles).forEach(function (idx) {
            var tile = tiles[idx];

            fnc(tile);
        });
    };

    // Allow for expansion.
};