

module.exports = (function () {
    "use strict";

    // Todo: Remove this module
    var //tbeLoader = require("../../tbe/loader"),
        modulePath = require("./local-paths").module;

    return {
        battle: require(modulePath + "battle/controller")(
            require("./contexts"),
            tbeLoader,
            require(modulePath + 'tbe/model/Battle')
        ),
        quests: require(modulePath + "quests/controller")
    };
}());
