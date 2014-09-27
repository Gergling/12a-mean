module.exports = function (context, tbe) {
    var Capacitor = tbe.Capacitor,
        stats = {
            attributes: {
                patience: 1, // Passively absorbs interest damage. Based on player stats.
                obscurity: 1 // Passively absorbs mystery damage. Also based on player stats.
            },
            capacitors: {
                interest: new Capacitor(),
                mystery: new Capacitor()
            }
        };

    context.setCorpse("report", "Report", {
        drops: function (args) {
            // Training hours for skills
            // Data which can be sold for credits
            // Quest items such as special data, etc.
            return [ ];
        }
    });

    // Mysteries probably spawn deliberate structures, such as a secret mining colony,
    // or a ship buried in an asteroid.
    context.setBattleFactory("surveillance", function (args) {
        
    });

    // Mapping an area of space. Low-level missions for new players.
    // Most likely to start with natural mysteries.
    context.setBattleFactory("mapping", function (args, Battle) {
        // Most likely to start with natural mystery
        var battle = new Battle();
        battle.on().turn(0).start(function () {
            //create a natural mystery
            //this.createCharacter(
        });
        return battle;
    });

    // Abilities need:
    // - Label
    // - Colour text from the user perspective
    // - Colour text from the target perspective
    context.setAbility("scan", "Scan",
        "Scans an area of interest. Increases visibility, decreases target mystery."
    );
    context.setAbility("stealth", "Decreases visibility for a period.");
    context.setAbility("drones", 
        "Increases effectiveness of scans while deployed. "
        + "May need to retturn with samples or for fuel after a while, "
        + "depending on area of interest."
    );
    context.setAbility("analyse", 
        "Opens possible options for other abilities by generating a buff. "
        + "Buff will be consumed by appropriate ability. Find a good name for buff."
        + "Preferably better than 'analysed'."
    );
    context.setAbility("renewed-interest", 
        "Heal interest levels. Requires analyse buff. Consumes analyse buff."
    );

    context.setAbility("bore", 
        "Lowers target's interest rating."
    );
    context.setAbility("inconsistent-data", 
        "Attacks a little of the target's interest. Restores mystery."
    );
    context.setAbility("unusual-variables", 
        "Scans cannot make sense of the mystery"
    );

    context.setCharacterDefaults(stats, function () {
        return {
            corpse: "report"
        };
    });

    // An area of interest maybe contain anything and may spawn anything.
    context.setCharacterFactory("mystery-natural", stats, function (args) {
        // Choose spawn(s). Assign attributes and abilities based on spawns.
        var spawns = ["spatial-anomaly"],
            spawnName = spawns[Math.floor(Math.random()*spawns.length)],
            spawn = context.getCharacterFactory(spawnName);

        // Calculate stats according to generated spawn.
        return {
            label: "Mysterious Space",
            spawns: {
                death: [spawn] // On death, the random spawn is created in it's place.
            },
            corpse: false // Does not generate a corpse.
        };
    });

    context.setCharacterFactory("mystery-deliberate", stats);
    context.setCharacterFactory("spatial-anomaly", stats);

    context.setCharacterFactory("obscured-structure", stats, function () {
        var adjective = ["", "Buried", "Secret", "Unusual"],
            noun = ["Spaceship", "Mining Colony", "Asteroid"];
        return {
            label: [adjective, noun].join(" ").trim()
        };
    });

    // An obfuscated space has been deliberately hidden from view.
    // It will likely spawn something of military or police interest.
    context.setCharacterFactory("obfuscated-space", stats);

    // A stealth vessel resides here. Stealth vessels can be scanned 
    // to gain information about a real vessel. As such, it may spawn a 
    // vessel schematic (a corpse) and a real vessel. A real vessel will 
    // open a captain quest for pursuit, and possibly combat.
    context.setCharacterFactory("stealth-vessel", stats);

    return context;
};
