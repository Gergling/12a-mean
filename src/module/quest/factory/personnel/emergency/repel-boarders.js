module.exports = function (factory) {
    "use strict";

    factory.generator(function (quest) {
        quest.variables("enemy");
        quest.label("Repel Boarders: {{enemy}}");
        quest.description("{{enemy}} is about to get inside the ship. Best get rid of them.");
    });
};
