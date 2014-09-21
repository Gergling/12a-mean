module.exports = function (context) {
    // An area of interest, when the mystery is taken away, spawns a Result.
    // Results (corpses) are what the intelligence officer is looking for.
    context.setBattleFactory("surveillance", {
    });

    context.setAbility("scan", 
        "Scans an area of interest. Increases visibility, decreases target mystery."
    );
    context.setAbility("stealth", "Decreases visibility for a period.");
    context.setAbility("drones", 
        "Increases effectiveness of scans while deployed. "
        + "May need to retturn with samples or for fuel after a while, "
        "depending on area of interest."
    );

    // An area of interest mayb contain anything and may spawn anything.
    context.setCharacterFactory("area-of-interest", {
        capacitors: {
            mystery: new Capacitor()
        }
    });

    // An obfuscated space has been deliberately hidden from view.
    // It will likely spawn something of military or police interest.
    context.setCharacterFactory("obfuscated-space", {
        capacitors: {
            mystery: new Capacitor()
        }
    });

    // A stealth vessel resides here. Stealth vessels can be scanned 
    // to gain information about a real vessel. As such, it may spawn a 
    // vessel schematic (a corpse) and a real vessel. A real vessel will 
    // open a captain quest for pursuit, and possibly combat.
    context.setCharacterFactory("stealth-vessel", {
        capacitors: {
            mystery: new Capacitor()
        }
    });
};
