// Tree should be used to generate a 'full tree' when creating templates, which includes the tree names.
// Might also have use for a 'flat tree'.
// If the whole thing is object oriented in the auto-generated version, the hierarchy can be assembled using references.
// This way the flat version can be easily assembled, using notations such as 'combat' and 'combat.strategy'.
// If the structure changes, skills will need to be marked to 'redirect'. Such that players can have all their skills updated.
// This should only need to happen once every change, on distribution.
// This will require a script to scan the database for these anomalies.

module.exports = function () {
    var SkillNode = require("../model/SkillNode")(),
        root = new Skillnode();

    root.set("combat").set({description: "Skills in murder when met with resistance"});
    root.set("combat.strategy").set({description: "Understanding of applied knowledge in combat"});
    root.set("combat.strategy.weapons");
    root.set("combat.strategy.obfuscation");
    root.set("combat.practical").set({description: "Instinctive application of combat skills"});
    root.set("combat.practical.unarmed").set({description: "The ability to fight without holding weapons"});
    root.set("combat.practical.weapons").set({description: "The ability to fight using weapons"});
    root.set("combat.practical.weapons.mounted").set({description: "Weapons mounted on a vehicle or turret"});
    root.set("combat.practical.weapons.personnel").set({description: "Weapons carried by sentient beings"});
    root.set("science").set({description: "Understanding of scientific methodology and its products"});
    root.set("science.model");
    root.set("science.model.biology");
    root.set("science.model.biology.xeno");
    root.set("science.model.biology.terran");
    root.set("science.model.biology.terran.animal");
    root.set("science.model.biology.terran.animal.mammal");
    root.set("science.model.biology.terran.animal.mammal.human");
    root.set("science.model.physics");
    root.set("science.model.psychology");
    root.set("science.technology");
    root.set("science.technology.medical");
    root.set("science.technology.engineering");
    root.set("science.technology.engineering.weapons");
    root.set("science.technology.engineering.engines");
    root.set("science.technology.engineering.defenses");
    root.set("science.technology.engineering.scanners");
    root.set("science.technology.engineering.environmental");
    root.set("science.technology.engineering.personnel");
    root.set("science.technology.engineering.encryption");
    root.set("charisma").set({description: "An understanding of how to communicate with other sentient beings"});
    root.set("lore").set({description: "General Knowledge"});
    root.set("lore.religion");

    return root;
};