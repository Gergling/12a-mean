module.exports = (function () {
    "use strict";

    var grunt = require("grunt"),
        pathService = require("path"),

        paths = {
            generator: "src/templates/image-generator/"
        };

    grunt.file.expand(paths.generator + "src/*.js").forEach(function (srcPath) {
        var fileName = pathService.basename(srcPath, ".js"),
            distribution = paths.generator + "dist/" + fileName + ".png";

        console.log(distribution);
        //contexts[contextName] = require(modulePath)(context);
        // Inject png instance
        //require(srcPath);
        // Expect png object returned
    });

}());
