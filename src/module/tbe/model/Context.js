module.exports = function (BattleFactory, CharacterFactory) {
    "use strict";

    var Context = function (name, startBattle) {
        var scope = this,
            characterFactories = { },
            battleFactories = { };
        this.name = name;
        this.startBattle = startBattle;
        this.defaults = {
            stats: { },
            generator: function () {return { }; }
        };

        this.setCharacterDefaults = function (stats, generator) {
            scope.defaults.stats = stats;
            scope.defaults.generator = generator;
        };
        this.setCharacterFactory = function (name, stats, generator) {
            characterFactories[name] = new CharacterFactory(
                // Look into deep-extend. Giggity.
                angular.extend(scope.defaults.stats, stats),
                function (args) {
                    return angular.extend(
                        scope.defaults.generator(args),
                        generator(args)
                    );
                }
            );
        };
        this.getCharacterFactory = function (name) {
            return characterFactories[name];
        };

        this.setBattleFactory = function (name, generator) {
            battleFactories[name] = new BattleFactory(generator);
        };
    };

    return Context;
};
