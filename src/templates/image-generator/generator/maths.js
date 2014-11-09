module.exports = (function () {
    "use strict";

    return {
        interpolate: function (min, max, from, to, current) {
            return (current * (max - min) / (to - from)) + min;
        },
        pythagoras: function (x, y) {
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
    };
}());
