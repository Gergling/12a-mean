describe("Battle controller", function () {
    "use strict";

    // Load up loader controllers from application
    // Maybe find a way to make this more convenient,
    // assuming we always need to do it.

    var promise = require("q").defer().promise,
        controller = require("../../../src/module/battle/controller");

    describe("#ability(playerId, abilityName, queryData)", function () {
        it("returns a promise", function () {
            expect(controller.ability(1, "any", {}).constructor).toBe(promise.constructor);
        });

        describe("rejects with error type", function () {
            var reject = function (player_id, abilityName, query, cb) {
                controller.ability(player_id, abilityName, query).then(function () {
                    return true;
                }, cb);
            };

            it("'nonexistent' for non-existent abilities", function () {
                reject(1, "does-not-exist", {}, function (error) {
                    expect(error.type).toBe("nonexistent");
                });
            });
            it("'unavailable' for locked abilities", function () {
                reject(1, "bore", {}, function (error) {
                    expect(error.type).toBe("unavailable");
                });
            });
            it("'malformed' for abilities which expected more query data", function () {
                reject(1, "scan", {}, function (error) {
                    expect(error.type).toBe("malformed");
                });
            });
        });

        it("resolves a valid call", function () {
            controller.ability(1, "renew-interest", { }).then(function () {
                expect(true).toBe(true);
            }, function () {
                expect(false).toBe("Call was invalid");
            });
        });
    });
});
