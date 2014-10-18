describe("SkillNode class", function () {
    "use strict";

    var SkillNode = require("../../../../src/module/skills/model/SkillNode")(),
        references = [
            ["combat"],
            ["combat", "strategy"],
            ["combat", "strategy", "engineering"]
        ];

    references.forEach(function (reference, idx) {
        var root = new SkillNode(),
            descendent = root.set(reference.join(".")),
            ancestorReference = [ ];

        it("reference '" + reference.join(".") + "' can be created and its ancestors found", function () {

            expect(descendent.constructor).toBe(SkillNode);

            descendent = root.find(reference.join("."));
            expect(descendent.constructor).toBe(SkillNode);

            expect(function () {return root.find(reference.join(".") + ".junk"); })
                .toThrow(new Error("Node named '" + reference[reference.length - 1] + "' has no child named 'junk'"));

            reference.forEach(function (chunk) {
                var node;
                if (ancestorReference.length) {
                    //root.find
                } else {
                    
                }
                ancestorReference.push(chunk);
            });
        });
    });

    // Test that skill nodes can load in level and hours from database.
    
    // Nodes need to be able to train up hours and levels
    
    // Levels effect neighbouring node levels.
    // Neighbour is at minimum halway between this node and the parent. 
    // The root parent level is considered to be 0.
    // This can result in:
    // (0) - 1 (root) - 2 (trained node)
    // (0) - 2 (root) - 3
    // (0) - 2 (root) - 4
    // The same applies to children
    // 0 (trained node) - 0 - 0
    // 1 (trained node) - 1 - 0
    // 2 (trained node) - 1 - 0
    // This system should only increase skill levels, never decrease them.

    // Skills have a maximum level of 100,000 training hours, calculated
    // from level and current training hours.
    // Once this cap is reached, the oldest-trained skill above a minimum 
    // level takes the reduction to meet the cap, and the level is reduced 
    // accordingly.
    
    // Nodes need to be able to save hours and levels
});
