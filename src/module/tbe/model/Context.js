module.exports = function () {
    "use strict";

    var BattleFactory = require("./BattleFactory"),
        CharacterFactory = require("./CharacterFactory"),
        Ability = require("./Ability"),
        Attribute = require("./Attribute"),
        Capacitor = require("./Capacitor"),
        deepExtend = require("deep-extend");

    return function () {
        var scope = this,
            characterFactories = { },
            battleFactories = { };
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
                deepExtend(scope.defaults.stats, stats),
                function (args) {
                    return deepExtend(
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

        this.setCorpse = function (name, label, props) {
            console.log("Context::setCorpse needs a body.");
        };

        this.abilities = { };
        this.setAbility = function (name, label, description, props) {
            var ability = new Ability(label, description, props)
            scope.abilities[name] = ability;
        };
        this.getAbilities = function () {
            return scope.abilities;
        };

        this.attributes = { };
        this.setAttribute = function (name, description) {
            var attribute = new Attribute();
            scope.attributes[name] = attribute;
        };

        this.capacitors = { };
        this.setCapacitor = function (name, description) {
            var capacitor = new Capacitor();
            scope.capacitors[name] = capacitor;
        };
    };
};
