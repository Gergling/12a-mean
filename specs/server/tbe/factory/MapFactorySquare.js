describe("tbe factory MapFactorySquare", function () {
    "use strict";

    var factory = require("../../../../src/module/tbe/factory/MapFactorySquare");

    it("#generate(battle, size) creates a square map of given size", function () {
        var map1x1 = factory.generate({ }, 1),
            map2x2 = factory.generate({ }, 2),
            map3x3 = factory.generate({ }, 3),
            expectation = function (map, size) {
                var width = 0,
                    height = 0;

                map.tiles(function (tile) {
                    width = Math.max(tile.x() + 1, width);
                    height = Math.max(tile.y() + 1, height);
                });
                expect(width).toBe(size);
                expect(height).toBe(size);
            };

        expectation(map1x1, 1);
        expectation(map2x2, 2);
        expectation(map3x3, 3);
    });
});
