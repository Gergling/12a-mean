describe("tbe-contexts space-intel", function () {
    "use strict";

    var context = require("../../../src/module/application/loader/contexts")["space-intel"];

    describe("Factories:", function () {
        describe("Battle:", function () {
            describe("mapping", function () {
                var battle = context.battleFactory("mapping").generate();

                it("player location is at (2, 2)", function () {
                    expect(battle.map().tile(2, 2).character().label()).toBe("You");
                });
                it("1 - 5 other enemies exist, not at (2, 2)", function () {
                    battle.map().tiles(function (tile) {
                        var character = tile.character();
                        if (character) {
                            if (character.label() === "You") {
                                expect(tile.x()).toBe(2);
                                expect(tile.y()).toBe(2);
                            } else {
                                expect([tile.x(), tile.y()].join("-")).toNotBe([2, 2].join("-"));
                            }
                        }
                    });
                    // Currently no test for the number of enemies.
                });
            });
        });
    });
});
