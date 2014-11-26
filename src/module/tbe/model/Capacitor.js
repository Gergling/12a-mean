module.exports = function () {
    "use strict";

    return function (overflowValue) {
        this.getCurrent = function () {
            return overflowValue;
        };
    };
};
