module.exports = function (png) {
    "use strict";

    var x, y, idx;
    png.width = 10;
    png.height = 10;

    for (y = 0; y < png.height; y += 1) {
        for (x = 0; x < png.width; x += 1) {
            /*jslint bitwise: true */
            idx = (png.width * y + x) << 2;
            /*jslint bitwise: false */
            png.data[idx] = 255;
            png.data[idx + 1] = 0;
            png.data[idx + 2] = 0;
            png.data[idx + 3] = 155;
        }
    }

    return png;
};
