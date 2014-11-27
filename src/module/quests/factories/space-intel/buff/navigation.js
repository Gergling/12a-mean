module.exports = function (QuestFactory) {
    "use strict";

    var factory = new QuestFactory();
    factory.generator(function (quest) {
        quest.type("buff");
        quest.context("space-intel");
        // Set the description procedurally. For these quests it might well 
        /// often be the same.
        quest.description("Every now and then spacetime needs to be checked "
            + "for lumps. "
            + "That way the navigation computer doesn't need to spend so "
            + "much time on... well... checking for lumps."
            + "I swear the last guy said he was a doctor.");

        quest.reward({
            // Probably need collection for this, or at least an array of 
            // quest reward objects
            // For these quests, a buff is generated that enhances the 
            /// navigation.
        });
        // Quest should have a battle factory.
        // In this case, 'mapping'.
        quest.battleFactory("mapping");
    });
    return factory;
};
