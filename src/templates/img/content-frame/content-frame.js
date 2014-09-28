var scope = this;
var dimensionalRatio = 5/8;

this.width = 320;
this.height = this.width * dimensionalRatio;

var thickness = {
    border: {
        outer: 10,
        middel: 10,
        inner: 10
    }
};

var gradients = {
    light: (function () {
        grd = ctx.createLinearGradient(0,0,scope.width,scope.height);
        grd.addColorStop(0,"lightgrey");
        grd.addColorStop(0.1,"grey");
        grd.addColorStop(0.4,"lightgrey");
        grd.addColorStop(0.52,"grey");
        grd.addColorStop(0.6,"lightgrey");
        grd.addColorStop(0.9,"grey");
        grd.addColorStop(1,"lightgrey");
        return grd;
    }()),
    dark: (function () {
        grd = ctx.createLinearGradient(0,0,scope.width,scope.height);
        grd.addColorStop(0,"grey");
        grd.addColorStop(0.1,"#333");
        grd.addColorStop(0.4,"grey");
        grd.addColorStop(0.52,"#333");
        grd.addColorStop(0.6,"grey");
        grd.addColorStop(0.9,"#333");
        grd.addColorStop(1,"#a44");
        return grd;
    }())
};

var a = new Point();
var b = new Point();
var points = {
    tl: new Point(0, 0),
    tr: new Point(this.width, 0),
    bl: new Point(0, this.height),
    br: new Point(this.width, this.height)
};

ctx.lineWidth = 2;

var tbo = thickness.border.outer;
for(i = 0;i < tbo; i++) {
    // Top
    ctx.strokeStyle = gradients.light;
    a.x = points.tl.x + i;
    b.x = points.tr.x - i;
    a.y = i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Bottom
    ctx.strokeStyle = gradients.dark;
    a.y = this.height - i;b.y = a.y;
    scope.drawLine(ctx, a, b);

    // Left
    ctx.strokeStyle = gradients.light;
    a.y = points.tl.y + i;
    b.y = points.bl.y - i;
    a.x = i;b.x = a.x;
    scope.drawLine(ctx, a, b);
}

