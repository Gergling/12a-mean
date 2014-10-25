module.exports = function () {
    "use strict";

    var SkillNode = require("../model/SkillNode")(),
        root = new SkillNode("root");

    root.set("combat", {
        description: "Skills in murder when met with resistance"
    });
    root.set("combat.strategy", {
        description: "Understanding of applied knowledge in combat"
    });
    root.set("combat.strategy.weapons");
    root.set("combat.strategy.obfuscation");
    root.set("combat.practical", {
        description: "Instinctive application of combat skills"
    });
    root.set("combat.practical.unarmed", {
        description: "The ability to fight without holding weapons"
    });
    root.set("combat.practical.weapons", {
        description: "The ability to fight using weapons"
    });
    root.set("combat.practical.weapons.mounted", {
        description: "Weapons mounted on a vehicle or turret"
    });
    root.set("combat.practical.weapons.personnel", {
        description: "Weapons carried by sentient beings"
    });
    root.set("science", {
        description: "Understanding of scientific methodology and its products"
    });
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
    root.set("charisma", {description: "An understanding of how to communicate with other sentient beings"});
    root.set("lore", {description: "General Knowledge"});
    root.set("lore.religion");

    return root.getTree();
};