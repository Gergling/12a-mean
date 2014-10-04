module.exports = function (context, tbe) {
    var extend = require("deep-extend"), Capacitor = tbe.Capacitor,
        stats = {
            attributes: {
                obscurity: 0 // Passively absorbs mystery damage. Also based on player stats.
            },
            capacitors: {
                energy: new Capacitor(),
                load: new Capacitor(),
                mystery: new Capacitor()
            }
        };

    // Setup all possible stats for this context somewhere.
        // The point is to easily feed in stats.
    context.setAttribute("patience", "Resistance to reduction of interest.");
    context.setCapacitor("interest", "How long the entity can hold your attention for.", {
        dr: "patience"
    });

    context.setCapacitor("energy", "Available energy for the equipment to use.");
    context.setCapacitor("load", "Degree of use the processor/memory are getting.");

    context.setAttribute("obscurity", "Slows reduction of mystery.");
    context.setCapacitor("mystery", "Extent to which the entity is understood.", {
        dr: "obscurity"
    });

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
        "Scans an area of interest. Increases visibility, decreases target mystery.",
        {
            text: {
                activation: "scan the target"
            },
            effects: [
                {
                    type: "attack",
                    capacitor: "mystery",
                    payload: function () {
                        // Skills and tool quality are contributors
                        return 1;
                    }
                }
            ]
        }
    );
    context.setAbility("stealth", "cloak the vessel", "Decreases visibility for a period.");
    context.setAbility("deploy-drones", "Deploy Drones",
        "send in the drones",
        "Increases effectiveness of scans while deployed. "
        + "May need to return with samples or for fuel after a while, "
        + "depending on area of interest."
    );
    context.setAbility("analyse", "Analyse Scan Data",
        "analyse the scan data",
        "Opens possible options for other abilities by generating a buff. "
        + "Buff will be consumed by appropriate ability. Find a good name for buff."
        + "Preferably better than 'analysed'."
    );
    context.setAbility("renewed-interest", "Renew Interest",
        // You...
        "find something interesting",
        "Heal interest levels. Requires analyse buff. Consumes analyse buff."
    );

    context.setAbility("bore", // Can only target characters with interest.
        // Passive scans...
        "indicate nothing interesting",
        "Lowers target's interest rating.",
        {
            target: {
                capacitors: "interest"
            }
        }
    );
    context.setAbility("mysticise", "", "", "",
        {
            target: "self"
            // Function for healing mystery.
        }
    );
    context.setAbility("inconsistent-data", "Data Inconsistency",
        "show inconsistent data",
        "Attacks a little of the target's interest. Restores mystery.",
        {
            sub: {
                bore: 0.25,
                mysticise: 0.75
            }
        }
    );
    context.setAbility("unusual-variables", 
        "shows unusual variables",
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

    context.setCharacterFactory("scanner", stats, function () {
        // Fix the stats for the scanner based on skills and equipment.
        return {
            label: "Scanner",
            description: "Contains the hardware to scan areas of space."
        };
    });
    context.setCharacterFactory("computer", stats, function () {
        // Stats based on skills and equipment
        return {
            label: "Computer",
            description: "Machine for analysing scan data."
        };
    });
    context.setCharacterFactory("you", stats, function (cf) {
        // Stats based on skills
        cf.setAttribute("patience", 1);
        cf.setCapacitor("interest", 1); // Passively absorbs interest damage. Based on player stats.
        return {
            label: "You",
            description: "The Intelligence Officer."
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
