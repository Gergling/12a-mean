

module.exports = (function () {
    "use strict";

    return {
        battle: require(require("./local-paths").module + "battle/controller")(
            require("./contexts"),
            require("./schemas").tbe,
            require(require("./local-paths").module + 'tbe/model/Battle')(
                require("./schemas").tbe
            )
        )
    };
}());
