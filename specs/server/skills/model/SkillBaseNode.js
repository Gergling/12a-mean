describe("SkillBaseNode class", function () {
    "use strict";

    var SkillBaseNode = require("../../../../src/module/skills/model/SkillBaseNode")(),
        references = [
            ["combat"],
            ["combat", "strategy"],
            ["combat", "strategy", "engineering"]
        ];

    references.forEach(function (reference, idx) {
        it("reference '" + reference.join(".") + "' can be created and its ancestors found", function () {
            var root = new SkillBaseNode(),
                descendent = root.set(reference.join(".")),
                ancestorReference = [ ];
            
            expect(descendent.constructor).toBe(SkillBaseNode);

            descendent = root.find(reference.join("."));
            expect(descendent.constructor).toBe(SkillBaseNode);

            expect(function () {return root.find(reference.join(".") + ".junk"); })
                .toThrow(new Error("Node named '" + reference[reference.length - 1] + "' has no child named 'junk'"));

            reference.forEach(function (chunk) {
                
            });
        });
    });
});
