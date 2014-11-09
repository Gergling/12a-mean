module.exports = function (png) {
    "use strict";

    var maths = require("./maths"),
        Pixel = require("./pixel");

    this.forEach = function (fnc, fromX, fromY, toX, toY) {
        var x, y, channel, pixel;

        fromX = fromX || 0;
        fromY = fromY || 0;
        toX = toX || png.width;
        toY = toY || png.height;

        for (y = fromY; y < toY; y += 1) {
            for (x = fromX; x < toX; x += 1) {
                /*jslint bitwise: true */
                channel = (png.width * y + x) << 2;
                /*jslint bitwise: false */

                pixel = new Pixel(
                    png.data[channel],
                    png.data[channel + 1],
                    png.data[channel + 2],
                    png.data[channel + 3]
                );

                fnc(pixel, x, y);

                pixel.toPNG(png.data, channel);
            }
        }
    };

    this.gradient = function (start, end, fromX, fromY, toX, toY) {
        var from, to, current;

        fromX = fromX || 0;
        fromY = fromY || 0;
        toX = toX || png.width;
        toY = toY || png.height;

        from = maths.pythagoras(fromX, fromY);
        to = maths.pythagoras(toX, toY);

        this.forEach(function (pixel, x, y) {
            current = maths.pythagoras(x, y);
            pixel.setGradient(start, end, from, to, current, pixel);
            console.log(current, pixel, start, end);
        }, fromX, fromY, toX, toY);
    };
};
