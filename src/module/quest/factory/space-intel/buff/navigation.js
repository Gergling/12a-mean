module.exports = function (factory) {
    "use strict";

    //var factory = new QuestFactory();

    // Work out whether there should be multiple navigation factories.
    // Yes, because multiple generators mighht be used...?
    factory.generator(function (quest) {
        // Set the description procedurally. For these quests it might well 
        // often be the same.
        quest.label("Navigation Feed");
        quest.description("Offer the navigator a locally-configured information feed, such that movement space is increased overall.");
        quest.reward({
            // Probably need collection for this, or at least an array of 
            // quest reward objects
            // For these quests, a buff is generated that enhances the navigation.
        });
        // Quest should have a battle factory.
        // In this case, 'mapping'.
        quest.battleFactory("mapping");
    });
};
