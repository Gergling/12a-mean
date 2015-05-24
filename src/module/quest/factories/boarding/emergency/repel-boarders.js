module.exports = function (QuestFactory) {
    "use strict";

    var factory = new QuestFactory();
    factory.setGenerator(function (quest) {
        quest.setType("emergency");
        quest.setContext("boarding");
        // Set the description procedurally. For these quests it might 
        // well often be the same.
        quest.setDescription();
        quest.setReward({ });
    });
    return factory;
};
