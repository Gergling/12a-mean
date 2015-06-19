module.exports = function (factory) {
    "use strict";

    factory.generator(function (quest) {
        quest.label("Tactical Feed");
        quest.description("Offer the tactical chief an information feed, such that weapon and defense efficiency is improved.");
        quest.battleFactory("mapping");
    });
};
