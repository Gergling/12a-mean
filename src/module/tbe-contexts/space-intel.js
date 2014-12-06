module.exports = function (context) {
    "use strict";

    var deepExtend = require("deep-extend"),

        tbePath = "../tbe/",

        Capacitor = require(tbePath + "model/Capacitor"),

        stats = {
            attributes: {
                obscurity: 0
                // Passively absorbs mystery damage. Also based on player stats.
            },
            capacitors: {
                energy: new Capacitor(),
                load: new Capacitor(),
                mystery: new Capacitor()
            }
        },
        factory = {
            map: {
                square: require(tbePath + "factory/MapFactorySquare")
            }
        };

    // Setup all possible stats for this context somewhere.
        // The point is to easily feed in stats.
    context.attribute("patience", "Resistance to reduction of interest.");
    context.capacitor("interest", "How long the entity can hold your "
        + "attention for.",
        {
            dr: "patience"
        });

    context.capacitor("energy", "Available energy for the equipment to "
        + "use.");
    context.capacitor("load", "Degree of use the processor/memory are "
        + "getting.");

    context.attribute("obscurity", "Slows reduction of mystery.");
    context.capacitor("mystery", "Extent to which the entity is "
        + "understood.",
        {
            dr: "obscurity"
        });

    context.corpse("report", "Report", {
        drops: function (args) {
            // Training hours for skills
            // Data which can be sold for credits
            // Quest items such as special data, etc.
            return [ ];
        }
    });

    // Mysteries probably spawn deliberate structures, such as a secret 
    // mining colony, or a ship buried in an asteroid.
    context.battleFactory("surveillance", function (battle) {
        battle.on().turn(0).start(function () {
            //create a natural mystery
            //this.createCharacter(
            return true;
        });
    });

    // Mapping an area of space. Low-level missions for new players.
    // Most likely to start with natural mysteries.
    context.battleFactory("mapping", function (battle, args) {
        // Most likely to start with natural mystery
        var size = 5,
            map = battle.map(factory.map.square.generate(size)),
            randInt = function (a) {
                return Math.floor(Math.random() * a);
            },
            totalMysteries,
            usedLocations = { },
            i,
            x,
            y;

        args = deepExtend({
            totalMysteries: randInt(5, 1)
        }, args);

        totalMysteries = args.totalMysteries;

        map.tile(2, 2).character(context.characterFactory("you").generate());
        usedLocations[2] = {2: true};

        for (i = 0; i < totalMysteries; i += 1) {
            x = 2;
            y = 2;
            while (usedLocations[x] && usedLocations[x][y]) {
                x = randInt(size);
                y = randInt(size);
            }
            if (!usedLocations[x]) {usedLocations[x] = { }; }
            usedLocations[x][y] = true;
            map.tile(x, y).character(
                context.characterFactory("mystery-natural").generate()
            );
        }
    });

    // Abilities need:
    // - Label
    // - Colour text from the user perspective
    // - Colour text from the target perspective
    context.ability("scan", "Scan", {
        glyphicon: "volume-up",
        text: {
            action: "scan the target",
            description: "Scans an area of interest. Increases visibility, "
                + "decreases target mystery."
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
    });
    context.ability("stealth", "Enable Cloaking Device", {
        glyphicon: "adjust",
        text: {
            action: "cloak the vessel",
            description: "Decreases visibility for a period."
        }
    });
    context.ability("deploy-drones", "Deploy Drones", {
        glyphicon: "plane",
        text: {
            action: "send in the drones",
            description: "Increases effectiveness of scans while deployed. "
                + "May need to return with samples or for fuel after a while, "
                + "depending on area of interest."
        }
    });
    context.ability("analyse", "Analyse Scan Data",
        "analyse the scan data",
        "Opens possible options for other abilities by generating a buff. "
            + "Buff will be consumed by appropriate ability. Find a good name "
            + "for buff."
            + "Preferably better than 'analysed'.",
        {glyphicon: "floppy-saved"}); // Image of 1s and 0s pattern

    context.ability("renewed-interest", "Renew Interest", {
        glyphicon: "eye-open", // Image of a brain being electricuted.
        text: {
            action: "find something interesting",
            description: "Heal interest levels. Requires analyse buff. "
                + "Consumes analyse buff."
        }
    });

    context.ability("bore", "Bore", {
        // Can only target characters with interest.
        // Passive scans...
        text: {
            action: "indicate nothing interesting",
            description: "Lowers target's interest rating."
        },
        target: {
            capacitors: "interest"
        }
    });
    context.ability("mysticise", "", "", "",
        {
            target: "self"
            // Function for healing mystery.
        });
        // Image of question mark-covered cloud

    context.ability("inconsistent-data", "Data Inconsistency", {
        // Image of 1s and 0s, and maybe a 2. Maybe make it red.
        text: {
            action: "show inconsistent data",
            description: "Attacks a little of the target's interest. "
                + "Restores mystery."
        },
        sub: {
            bore: 0.25,
            mysticise: 0.75
        }
    });
    context.ability("unusual-variables", "Unusual Variables", {
        text: {
            action: "shows unusual variables",
            description: "Scans cannot make sense of the mystery"
        }
    });

    context.setCharacterDefaults(stats, function () {
        return {
            corpse: "report"
        };
    });

    // An area of interest maybe contain anything and may spawn anything.
    context.characterFactory("mystery-natural", function (character) {
        // Choose spawn(s). Assign attributes and abilities based on spawns.
        var spawns = ["spatial-anomaly"],
            spawnFactoryName = spawns[
                Math.floor(Math.random() * spawns.length)
            ],
            spawn = context.characterFactory(spawnFactoryName);

        character.label("Mysterious Space");
        character.on().death().spawn(spawn);
        // Assign abilities. Mystery has a subset of 'natural' abilities.
        // Assign attributes, e.g. obscurity.
        // Assign capacitors, e.g. mystery.
    });

    context.characterFactory("scanner", function () {
        // Fix the stats for the scanner based on skills and equipment.
        return {
            label: "Scanner",
            description: "Contains the hardware to scan areas of space."
        };
    });
    context.characterFactory("computer", function () {
        // Stats based on skills and equipment
        return {
            label: "Computer",
            description: "Machine for analysing scan data."
        };
    });
    context.characterFactory("you", function (character) {
        // Stats based on skills
        character.attribute("patience", 1);
        character.capacitor("interest", 1);
            // Passively absorbs interest damage. Based on player stats.
        character.label("You");
        character.description("The Intelligence Officer.");
    });

    context.characterFactory("mystery-deliberate", function () {
        return true;
    });
    context.characterFactory("spatial-anomaly", function () {
        return true;
    });

    context.characterFactory("obscured-structure", function () {
        var adjective = ["", "Asteroid-Buried", "Secret", "Unusual"],
            noun = ["Spaceship", "Mining Colony", "Asteroid"];
        return {
            label: [adjective, noun].join(" ").trim()
        };
    });

    // An obfuscated space has been deliberately hidden from view.
    // It will likely spawn something of military or police interest.
    context.characterFactory("obfuscated-space", function () {
        return true;
    });

    // A stealth vessel resides here. Stealth vessels can be scanned 
    // to gain information about a real vessel. As such, it may spawn a 
    // vessel schematic (a corpse) and a real vessel. A real vessel will 
    // open a captain quest for pursuit, and possibly combat.
    context.characterFactory("stealth-vessel", function () {
        return true;
    });

    context.abilityRegister(function (name) {
        return [
            "scan",
            "stealth",
            "analyse",
            "renewed-interest",
            "deploy-drones"
        ].indexOf(name) > -1;
    });
    return context;
};
