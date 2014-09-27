// In this context, battles are fought by captains in fleets of ships.

// The context needs to procedurally generate battles.
// Characters are ships.
// Battle begins by generating a random number of ships depending 
// on difficulty. 
// This is the function that TBE cares about. It will run this 
// whenever a battle begins.
// Battle begins with:
// - Battle.start('context-name');

// A Context is an object to keep a battle starting function against.

// Need to distinguish between a specific character and a character 
// factory, which is designed within the context.

module.exports = function (context) {
    "use strict";

    var types = {
        fighter: {
            fighter: 1,
            evasion: 2,
            armour: 0
        }
    }, groups = {
        fighter: [
            "bomber-squadron",
            "interceptor-squadron",
            "stealth-squadron"
        ]
    };
    groups.fighter.forEach(function (name) {
        context.setCharacterFactory(name, {
            attributes: types.fighter,
            capacitors: {
                shields: new Capacitor()
            }
        });
    });
    context.getCharacterFactory("stealth-squadron").setAttributes({stealth: 1});


    // Rewards for the captain missions are training hours and credits for all players,
    // and budget renewal for the ship.
    context.setBattleFactory("space-warfare", {
        // Setup battle initialisation.
        // Setup battle completion rewards.
    });
    context.setBattleFactory("escort", {
    });


    // Abilities.
    // TBE abilities will be unlockable from logic given here using a
    // function that returns a boolean value.
};
