var radius = 50;
this.width = (radius * 4);
this.height = (radius * 3);
var cx = this.width/2, cy = this.height/2;
var l = new Point(
    cx - radius,
    cy
);
var r = new Point(
    cx + radius,
    cy
);
var background = new Image();
background.src = "https://c3e0976d5fa48a0ee2571be341af11486e64e7de.googledrive.com/host/0Bxf8n7VcUjWsdlc0QUpRWUEzTUk/black-hole.jpg";
background.onload = function() {
    // Draw in background image
    ctx.drawImage(background, 0, 0, scope.width, scope.width * background.height / background.width);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = radius/4;
    ctx.strokeStyle = 'darkred';
    ctx.stroke();

    scope.drawLine(ctx, l, r);
};
