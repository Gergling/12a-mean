module.exports = function (QuestFactory) {
    var factory = new QuestFactory();
    factory.setGenerator(function (quest) {
        quest.setType("emergency");
        quest.setContext("boarding");
        // Set the description procedurally. For these quests it might well often be the same.
        quest.setDescription(" "
            + ""
            + ""
        );
        quest.setReward({
            // The reward is being able to progress. Shouldn't have too many of these.
        });
    });
    return factory;
};
