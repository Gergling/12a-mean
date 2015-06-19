module.exports = (function () {
    var Factory = function () {
        var scope = this;
        
        // Private getter/setter properties
        var p = { };
        [
            "context",
            "reward",
            "name"
        ].forEach(function (prop) {
            scope[prop] = function (value) {
                if (value) {
                    p[prop] = value;
                }
                return p[prop];
            }
        });

        this.generate = function (player) {
            var quest = new Quest();
            
            // Quest is scaled and customised according to player configuration.

            generator(quest);
            return quest;
        };
        this.generator = function (value) {
            generator = value;
        };
    };

    return function (contextName, rewardType, questType) {
        var factory = new Factory();

        factory.context(contextName);
        factory.reward(rewardType);
        factory.name(questType);

        return factory;
    };
}());