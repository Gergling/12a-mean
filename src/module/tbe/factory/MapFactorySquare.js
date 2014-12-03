// Module is a singleton object.

module.exports = (function () {
    "use strict";

    var Map = require("../model/Map"),

        generate = function (battle, size) {
            var map = new Map(),
                x,
                y;

            map.battle(battle);

            for (x = 0; x < size; x += 1) {
                for (y = 0; y < size; y += 1) {
                    map.tile(x, y);
                }
            }

            return map;
        };

    return {
        generate: generate
    };
}());