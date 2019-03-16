function drawBackground(){
    var canvas = document.getElementById('circle');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    if (canvas.getContext)
    {
        var ctx = canvas.getContext('2d'); 
        //draw circle
        var Rx = canvas.width / 1.7;
        var Ry = 0;
        var R = (Rx+Ry)/1.5;
        ctx.beginPath();
        ctx.arc(Rx, Ry, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = Math.sqrt(Rx+Ry)*3;
        ctx.strokeStyle = '#DDD';
        ctx.stroke();
        //draw line
        var P1x=canvas.width/3;
        var P1y=-canvas.height;
        var P2x=canvas.width;
        var P2y=canvas.height;
        ctx.beginPath();
        ctx.moveTo(P1x,P1y);
        ctx.lineTo(P2x,P2y);
        ctx.stroke();

        //draw point
        //y=ax+b
        var a=(P2y-P1y)/(P2x-P1x);
        var b=(P2x*P1y-P1x*P2y)/(P2x-P1x);
        var Px=findCircleLineIntersections(R,Rx,Ry,a,b);
        ctx.beginPath();
        ctx.arc(Px[0], a*Px[0]+b, Math.sqrt(Rx+Ry)*4, 0, 2 * Math.PI, false);
        ctx.arc(Px[1], a*Px[1]+b, Math.sqrt(Rx+Ry)*4, 0, 2 * Math.PI, false);
        ctx.fillStyle='#BBB';
        ctx.fill();
    }
}
function findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    var a = 1 + m*m;
    var b = -h * 2 + (m * (n - k)) * 2;
    var c = h*h + Math.pow(n - k,2) - r*r;

    // get discriminant
    var d = b*b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        var intersections = [
            (-b + Math.sqrt(b*b - 4 * a * c)) / (2 * a),
            (-b - Math.sqrt(b*b - 4 * a * c)) / (2 * a)
        ];
        if (d == 0) {
            // only 1 intersection
            return [intersections[0]];
        }
        return intersections;
    }
    // no intersection
    return [];
}
