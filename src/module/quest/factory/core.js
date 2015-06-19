module.exports = (function () {
    // Bring in every available factory.
    "use strict";

    var grunt = require("grunt");
    var factories = [ ];
    var config = {
        minimum: 5,
        maximum: 25,
        emergency: 5 // Maximum emergency quests
    };

    // Load all possible factories
    grunt.file.expand("src/module/quest/factory/*/*/*.js").forEach(function (path) {
        var chunks = path.split('/');
        var contextName = chunks[4];
        var rewardType = chunks[5];
        var questType = chunks[6];
        var factory = require("./factory")(contextName, rewardType, questType);

        factories.push(require([ ".", contextName, rewardType, questType ].join("/"))(factory));
    });

    return {
        all: function (player) {
            // Use all factories relevant to role
            var deferred = q.defer();
            var toCreate = config.minimum - player.quests().length;
            var i;
            var factory;
            var quest;

            if (toCreate > 0) {
                for (i = 0; i < toCreate; i += 1) {
                    // Pick a factory
                    factory = factories[Math.round(Math.random() * factories.length)];
                    
                    // Currently factory selector is a crude random generator
                    // Factories need to be shuffled such that the player has less chance of getting the same factory twice.
                    // Maybe assign each quest a score by the number of similarities it has to the player's existing quests
                    // So count the number of times the context, reward, name combination appears and subtract each from the total number of items.
                    // Add the results together for the factory weighting.
                    // Then create (or find) a weighted random-number generator which chooses based on weighting.
                    // One way to do this would be to add the factories to an array once for each point in their weighting.
                    // Pick on at random, and the 

                    // Generate quest
                    quest = factory.generate(player);
                    player.quest(quest);
                }
                player.save().then(function () {
                    deferred.resolve(player.quests());
                });
            } else {
                deferred.resolve(player.quests());
            }
        },
        add: function (factory) {
            // A new quest is generated here based on the chosen factory
            // If quest list has more than [max] items, do NOT add any more non-emergency quests
        },
        emergency: function (factory) {
            // If quest list has >= config.emergency quests, no emergency quests should be generated
        }
    };
}());