module.exports = function () {
    "use strict";

    var Tile = require("./Tile"),

        scope = this,
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

    this.charactersPerTile = function (value) {
        scope.tiles(function (tile) {
            tile.maximumCharacters(value);
        });
    };

    this.view = function () {
        var view = { tiles: [ ] };
        this.tiles(function (tile) {
            view.tiles.push(tile.view());
        });
        return view;
    };
    // A function for moving things between two tiles 
        // would probably be a good idea.
};