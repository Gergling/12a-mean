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
        xOffSet = (scope.width - bgWidth) * (scale / 2);
    ctx.drawImage(background, xOffSet, 0, bgWidth, scope.height);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = radius/4;
    ctx.strokeStyle = 'darkred';
    ctx.stroke();

    scope.drawLine(ctx, l, r);
};
