module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        getDec = function (hex) {
            return parseInt(hex, 16);
        };

    png.width = 10;

    generator.raster.gradient(new Pixel(
        getDec("20"),
        getDec("d0"),
        getDec("f0")
    ), new Pixel(255, 255, 255));

    return png;
};
