// Tree should be used to generate a 'full tree' when creating templates, which includes the tree names.
// Might also have use for a 'flat tree'.
// If the whole thing is object oriented in the auto-generated version, the hierarchy can be assembled using references.
// This way the flat version can be easily assembled, using notations such as 'combat' and 'combat.strategy'.
// If the structure changes, skills will need to be marked to 'redirect'. Such that players can have all their skills updated.
// This should only need to happen once every change, on distribution.
// This will require a script to scan the database for these anomalies.

module.exports = function () {
    var SkillCollection = require("../model/SkillCollection")(),
        collection = new SkillCollection();

    //collection.set(tree);
    collection.setNode("combat").set({description: "Skills in murder when met with resistance"});
    collection.setNode("combat.strategy").set({description: "Understanding of applied knowledge in combat"});
    collection.setNode("combat.strategy.weapons");
    collection.setNode("combat.strategy.obfuscation");
    collection.setNode("combat.practical").set({description: "Instinctive application of combat skills"});
    collection.setNode("combat.practical.unarmed").set({description: "The ability to fight without holding weapons"});
    collection.setNode("combat.practical.weapons").set({description: "The ability to fight using weapons"});
    collection.setNode("combat.practical.weapons.mounted").set({description: "Weapons mounted on a vehicle or turret"});
    collection.setNode("combat.practical.weapons.personnel").set({description: "Weapons carried by sentient beings"});
    collection.setNode("science").set({description: "Understanding of scientific methodology and its products"});
    collection.setNode("science.model");
    collection.setNode("science.model.biology");
    collection.setNode("science.model.biology.xeno");
    collection.setNode("science.model.biology.terran");
    collection.setNode("science.model.biology.terran.animal");
    collection.setNode("science.model.biology.terran.animal.mammal");
    collection.setNode("science.model.biology.terran.animal.mammal.human");
    collection.setNode("science.model.physics");
    collection.setNode("science.model.psychology");
    collection.setNode("science.technology");
    collection.setNode("science.technology.medical");
    collection.setNode("science.technology.engineering");
    collection.setNode("science.technology.engineering.weapons");
    collection.setNode("science.technology.engineering.engines");
    collection.setNode("science.technology.engineering.defenses");
    collection.setNode("science.technology.engineering.scanners");
    collection.setNode("science.technology.engineering.environmental");
    collection.setNode("science.technology.engineering.personnel");
    collection.setNode("science.technology.engineering.encryption");
    collection.setNode("charisma").set({description: "An understanding of how to communicate with other sentient beings"});
    collection.setNode("lore").set({description: "General Knowledge"});
    collection.setNode("lore.religion");

    return collection;
};