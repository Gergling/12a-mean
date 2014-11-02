#!/usr/bin/env node

module.exports = (function () {

    var fs = require('fs'),
        PNG = require('pngjs').PNG;


    var png = new PNG({
            filterType: -1
        });
        png.data = [ ];
    console.log(png);
    //var src = fs.createReadStream(process.argv[2]),
        //dst = fs.createWriteStream(process.argv[3] || 'out.png');
    var dst = fs.createWriteStream('out.png');


    png.width = 10;
    png.height = 10;

    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {
            var idx = (png.width * y + x) << 2;
            png.data[idx] = 1;
            png.data[idx+1] = 1;
            png.data[idx+2] = 1;
            png.data[idx+3] = 0;
        }
    }
    //png.on('parsed', function() {

        /*for (var y = 0; y < png.height; y++) {
            for (var x = 0; x < png.width; x++) {
                var idx = (png.width * y + x) << 2;

                if (Math.abs(png.data[idx] - png.data[idx+1]) <= 1
                        && Math.abs(png.data[idx+1] - png.data[idx+2]) <= 1)
                    png.data[idx] = png.data[idx+1] = png.data[idx+2];

            }
        }*/
        

        png.pack().pipe(dst);
    //});

    //src.pipe(png);

}());
