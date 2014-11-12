module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        pathService = require("path"),
        fs = require('fs'),
        PNG = require('pngjs').PNG,

        Generator = require("./generator/core"),

        newPNG = function () {
            var png = new PNG();
            if (!png.data) {png.data = [ ]; }
            png.width = 1;
            png.height = 1;
            png.alpha = true;
            return png;
        },
        paths = {
            module: "./",
            generator: "src/templates/image-generator/"
        };

    grunt.file.expand(paths.generator + "src/*.js").forEach(function (srcPath) {
        var fileName = pathService.basename(srcPath, ".js"),
            distPath = paths.generator + "dist/" + fileName + ".png",
            dst = fs.createWriteStream(distPath),
            png = newPNG(),
            fnc = require(paths.module + "src/" + fileName),
            gen = new Generator(png);

        if (typeof fnc === "function") {
            fnc(png, gen);

            png.pack().pipe(dst); // Todo: Touch dist folder.
            grunt.log.writeln("- Image generated: '" + fileName + "'");
            // Also, it would be nice to know why the laptop doesn't want to let me 
            // use the function keys.
        } else {
            grunt.log.writeln("- No function exported for: "
                + fileName + ".js");
        }
    });

}());
