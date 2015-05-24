module.exports = (function () {

    "use strict";

    /*jslint unparam: true */
    return {
        tree: function (req, res) {
            // If the user is logged in, this should return their skill levels as well.
            res.send(require("./config/tree")());
        }
    };
    /*jslint unparam: false */
}());