describe("tbe-contexts space-intel", function () {
    "use strict";

    var context = require("../../../src/module/application/loader/contexts")["space-intel"];

    describe("Factories:", function () {
        describe("Battle:", function () {
            describe("mapping", function () {
                console.log(context.battleFactory("mapping"));
                var battle = context.battleFactory("mapping").generate();

                it("player location is at (2, 2)", function () {
                    
                });
            });
        });
    });
});
