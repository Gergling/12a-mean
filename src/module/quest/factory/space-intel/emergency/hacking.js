module.exports = function (factory) {
    "use strict";

    factory.generator(function (quest) {
        quest.variables("enemy");
        quest.label("Cyber-warfare Countermeasures: {{enemy}}");
        quest.description("{{enemy}} is attempting a cyber-attack. I used to be a hacker like you, then I got married.");
    });
};
