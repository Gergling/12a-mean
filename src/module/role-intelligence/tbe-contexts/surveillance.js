module.exports = function (context) {
    var stats = {
        attributes: {
            patience: 1, // Passively absorbs interest damage.
            obscurity: 1 // Passively absorbs mystery damage.
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

    // An area of interest, when the mystery is taken away, spawns a Result.
    // Results (corpses) are what the intelligence officer is looking for.
    context.setBattleFactory("surveillance", {
    });

    // Abilities need:
    // - Label
    // - Colour text from the user perspective
    // - Colour text from the target perspective
    context.setAbility("scan", 
        "Scans an area of interest. Increases visibility, decreases target mystery."
    );
    context.setAbility("stealth", "Decreases visibility for a period.");
    context.setAbility("drones", 
        "Increases effectiveness of scans while deployed. "
        + "May need to retturn with samples or for fuel after a while, "
        "depending on area of interest."
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
            spawns: {
                death: [spawn] // On death, the random spawn is created in it's place.
            },
            corpse: false
        };
    });

    context.setCharacterFactory("mystery-deliberate", stats);
    context.setCharacterFactory("spatial-anomaly", stats);

    // An obfuscated space has been deliberately hidden from view.
    // It will likely spawn something of military or police interest.
    context.setCharacterFactory("obfuscated-space", stats);

    // A stealth vessel resides here. Stealth vessels can be scanned 
    // to gain information about a real vessel. As such, it may spawn a 
    // vessel schematic (a corpse) and a real vessel. A real vessel will 
    // open a captain quest for pursuit, and possibly combat.
    context.setCharacterFactory("stealth-vessel", stats);
};
