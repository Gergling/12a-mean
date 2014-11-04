module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        pathService = require("path"),
        fs = require('fs'),
        PNG = require('pngjs').PNG,

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
            png = newPNG();

        require(paths.module + "src/" + fileName)(png);

        grunt.log.writeln("- Image generated: '" + fileName + "'");

        png.pack().pipe(dst);
    });

}());
