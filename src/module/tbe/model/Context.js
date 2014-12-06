module.exports = (function () {
    "use strict";

    var BattleFactory = require("../factory/BattleFactory"),
        CharacterFactory = require("../factory/CharacterFactory"),

        Ability = require("./Ability"),
        Attribute = require("./Attribute"),
        Capacitor = require("./Capacitor"),

        attributes = { },
        capacitors = { };

    return function () {
        var scope = this,
            factories = {
                battle: { },
                character: { }
            },
            abilities = { },
            abilityRegister = function () {return true; };

        this.defaults = {
            stats: { },
            generator: function () {return { }; }
        };

        this.setCharacterDefaults = function (stats, generator) {
            scope.defaults.stats = stats;
            scope.defaults.generator = generator;
        };
        this.characterFactory = function (name, generator) {
            var factory = factories.character[name];
            if (generator) {
                factory = new CharacterFactory();
                factory.generator(generator);
                factories.character[name] = factory;
            }
            return factory;
        };

        this.battleFactory = function (name, generator) {
            var factory = factories.battle[name];
            if (generator) {
                factory = new BattleFactory();
                factory.generator(generator);
                factories.battle[name] = factory;
            }
            return factory;
        };

        this.corpse = function () {
            return true;
        };

        this.ability = function (name, label, props) {
            if (label && props) {
                abilities[name] = new Ability(label, props);
            }
            return abilities[name];
        };
        this.abilities = function () {
            var unlocked = { };
            Object.keys(abilities).forEach(function (abilityName) {
                if (scope.abilityAvailable(abilityName)) {
                    unlocked[abilityName] = abilities[abilityName];
                }
            });
            return unlocked;
        };
        this.abilityRegister = function (fnc) {abilityRegister = fnc; };
        this.abilityAvailable = function (name) {
            return abilityRegister(name);
        };

        this.attribute = function (name, description) {
            var attribute = new Attribute();
            attribute.description(description);
            attributes[name] = attribute;
        };

        this.capacitor = function (name) {
            var capacitor = new Capacitor();
            capacitors[name] = capacitor;
        };
    };
}());
