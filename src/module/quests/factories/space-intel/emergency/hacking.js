module.exports = function (QuestFactory) {
    var factory = new QuestFactory();
    factory.setGenerator(function (quest) {
        quest.setType("buff");
        quest.setContext("space-intel");
        // Set the description procedurally. For these quests it might well often be the same.
        quest.setDescription("Every now and then spacetime needs to be checked for lumps. "
            + "That way the navigation computer doesn't need to spend so much time on... well... checking for lumps."
            + "I swear the last guy said he was a doctor."
        );
        quest.setReward({
            // Probably need collection for this, or at least an array of quest reward objects
            // For these quests, a buff is generated that enhances the navigation.
        });
    });
    return factory;
};
