module.exports = (function () {
    "use strict";

    // Todo: Remove this module
    return {
        schema: require('./schema')(require('mongoose'))
    }
}());
