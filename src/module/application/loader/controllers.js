

module.exports = (function () {
    "use strict";

    var tbeLoader = require("../../tbe/loader"),
        modulePath = require("./local-paths").module;

    return {
        battle: require(modulePath + "battle/controller")(
            require("./contexts"),
            tbeLoader,
            require(modulePath + 'tbe/model/Battle')
        )
    };
}());
