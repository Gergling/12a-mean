module.exports = function (png, generator) {
    "use strict";

    var Pixel = generator.Pixel,
        getDec = function (hex) {
            return parseInt(hex, 16);
        };

    png.width = 19;

    generator.raster.gradient(new Pixel(
        getDec("20"),
        getDec("d0"),
        getDec("f0")
    ), new Pixel(255, 255, 255),
        0, 0,
        10, 0);

    generator.raster.gradient(new Pixel(255, 255, 255), new Pixel(
        getDec("20"),
        getDec("d0"),
        getDec("f0")
    ),
        10, 0,
        19, 0);

    return png;
};
