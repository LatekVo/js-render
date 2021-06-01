// Ignacy Łątka - Vanilla JS camera matrix implementation

var points = [
	[100, 100, 100], // 0 | x0 y0 z0
	[300, 100, 100], // 1 | x1 y0 z0
	[100, 300, 100], // 2 | x0 y1 z0
	[300, 300, 100], // 3 | x1 y1 z0
	[100, 100, 300], // 4 | x0 y0 z1
	[300, 100, 300], // 5 | x1 y0 z1
	[100, 300, 300], // 6 | x0 y1 z1
	[300, 300, 300], // 7 | x1 y1 z1
];

/* found this pattern, for the shape i want:
 * i --- i+2^(0 -> 2) (and i --- i+3 for aesthetic triangles)
 *
 * after drawing, and seeing 0-1, 0-2, 0-4
 *
 * don't worry about errors, this formula creates every connection once,
 * errors indicate the very last points, which already have all connections
 */

var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");

for (var i = 0; i < points.length; i++) {
	for (var target = 1; target <= 4; target++) {
		ctx.moveTo(points[i][0], points[i][1]);
		ctx.lineTo(points[i+target][0], points[i+target][1]);
		ctx.stroke();
	}
}

