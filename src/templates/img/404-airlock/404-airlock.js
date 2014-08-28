var radius = 50;
this.width = (radius * 4);
this.height = (radius * 3);
var ratio = this.height / this.width;
var cx = this.width/2, cy = this.height/2;
var l = new Point(cx - radius, cy);
var r = new Point(cx + radius, cy);

var background = new Image();
background.src = "https://c3e0976d5fa48a0ee2571be341af11486e64e7de.googledrive.com/host/0Bxf8n7VcUjWsdlc0QUpRWUEzTUk/black-hole.jpg";
background.onload = function() {
    // Draw in background image
    var backgroundRatio = background.height / background.width, 
        scale = ratio / backgroundRatio,
        bgWidth = scope.width * scale,
        xOffSet = (scope.width - bgWidth) * (scale / 2),
        i;
    ctx.drawImage(background, xOffSet, 0, bgWidth, scope.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'grey';
    var drawHLine = function (y) {
        var al = new Point(0, y);
        var ar = new Point(scope.width, y);
        scope.drawLine(ctx, al, ar);
    };
    for(i = 0; i < cy - radius; i++) {drawHLine(i);}
    for(i = cy - radius; i < cy + radius; i++) {
        var xOffset = Math.sqrt(Math.pow(radius, 2) - Math.pow(i - cy, 2));
        var ll = new Point(0, i);
        var lr = new Point(cx - xOffset, i);
        scope.drawLine(ctx, ll, lr);
        var rl = new Point(cx + xOffset, i);
        var rr = new Point(scope.width, i);
        scope.drawLine(ctx, rl, rr);
    }
    for(i = cy + radius; i < scope.height; i++) {drawHLine(i);}

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = radius/4;
    ctx.strokeStyle = 'darkred';
    ctx.stroke();

    scope.drawLine(ctx, l, r);
};
