describe("SkillNode class", function () {
    "use strict";

    var SkillNode = require("../../../../src/module/skills/model/SkillNode")(),
        references = [
            ["combat"],
            ["combat", "strategy"],
            ["combat", "strategy", "engineering"]
        ],
        root;

    beforeEach(function () {
        root = new SkillNode();
    });
    references.forEach(function (reference, idx) {
        it("reference '" + reference.join(".") + "' can be created and its ancestors found", function () {
            var descendent = root.set(reference.join(".")),
                ancestorReference = [ ];

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
    
    // Test calculation for hours
    it("#getTrainingHours() gets the training hours for the current level", function () {
        expect(root.getTrainingHours()).toBe(0);
        root.train(); // level 1, 0 hours
        expect(root.getTrainingHours()).toBe(0);
        root.train(); // level 1, 1 hour
        expect(root.getTrainingHours()).toBe(1);
    });

    // Test calculation for hours
    it("#getTotalTrainingHours() gets the total of level hours and the current training hours", function () {
        expect(root.getTotalTrainingHours()).toBe(0);
        root.train(); // level 1, 0 hours
        expect(root.getTotalTrainingHours()).toBe(1);
        root.train(); // level 1, 1 hour
        expect(root.getTotalTrainingHours()).toBe(2);
        root.train(); // level 2, 0 hours
        expect(root.getTotalTrainingHours()).toBe(3);
    });

    // Nodes need to be able to train up hours and levels
    describe("#train()", function () {
        it ("increments training hours by 1", function () {
            var hoursBefore = root.getTotalTrainingHours(),
                hoursAfter;
            root.train();
            hoursAfter = root.getTotalTrainingHours();
            expect(hoursAfter).toBe(hoursBefore + 1);
        });

        it("requires the level in hours to gain a level and resets the hours to 0", function () {
            var i, beforeLevel = 0, afterLevel = 0;
            for(i = 0; i < 100 && beforeLevel === afterLevel; i += 1) {
                beforeLevel = root.getLevel();
                root.train();
                afterLevel = root.getLevel();
            }
            expect(afterLevel).toBe(beforeLevel + 1);
            expect(root.getTrainingHours());
        });
    });
    
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