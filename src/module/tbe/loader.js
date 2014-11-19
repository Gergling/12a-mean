module.exports = (function () {
    "use strict";

    return {
        schema: require('./schema')(require('mongoose'))
    }
}());
