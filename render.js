// Ignacy Łątka - Vanilla JS camera matrix implementation

var origins = [
	[-100, -100, -100], // 0 | x0 y0 z0
	[100, -100, -100], // 1 | x1 y0 z0
	[-100, 100, -100], // 2 | x0 y1 z0
	[100, 100, -100], // 3 | x1 y1 z0
	[-100, -100, 100], // 4 | x0 y0 z1
	[100, -100, 100], // 5 | x1 y0 z1
	[-100, 100, 100], // 6 | x0 y1 z1
	[100, 100, 100], // 7 | x1 y1 z1
];

var points = [ // holds calculated results, single record will be read multiple times
	[0, 0, 0], // 0 | x0 y0 z0
	[0, 0, 0], // 1 | x1 y0 z0
	[0, 0, 0], // 2 | x0 y1 z0
	[0, 0, 0], // 3 | x1 y1 z0
	[0, 0, 0], // 4 | x0 y0 z1
	[0, 0, 0], // 5 | x1 y0 z1
	[0, 0, 0], // 6 | x0 y1 z1
	[0, 0, 0], // 7 | x1 y1 z1
];


/* i --- i+2^(0 -> 2) (and i --- i+3 for aesthetic triangles)
/* ~
/* after looking at coords above, this formula was created, 
/* it connects every desired point to his neighbors exactly once
/* (works only for this specific cube, or anything with that specific point layout)
*/


var ctx = document.getElementById("mainCanvas").getContext("2d");
var center = [200, 200, 200];

//   yaw,    pitch,     roll
var rotA = 0, rotB = 0, rotC = 0;

main();

function main() {

	var tStart = performance.now();

	// correction
	rotA = rotA % 360;
	rotB = rotB % 360;
	rotC = rotC % 360;

	radA = rotA * Math.PI / 180.0
	radB = rotB * Math.PI / 180.0
	radC = rotC * Math.PI / 180.0
	
	//For my IT teacher: I've done the matrix calculations myself

	// matrix math, this is just a multiplication
	// im assuming i need to multiply R by vertical [x, y, z]
	// 3 precalculated parts of matrix's dot product
	rX0 = Math.cos(radA) * Math.cos(radB);
	rX1 = (Math.cos(radA) * Math.sin(radB) * Math.sin(radC)) - (Math.sin(radA) * Math.cos(radC));
	rX2 = (Math.cos(radA) * Math.sin(radB) * Math.cos(radC)) + (Math.sin(radA) * Math.sin(radC));
	// 3 precalculated parts of matrix's dot product
	rY0 = Math.sin(radA) * Math.cos(radB);
	rY1 = (Math.sin(radA) * Math.sin(radB) * Math.sin(radC)) + (Math.cos(radA) * Math.cos(radC));
	rY2 = (Math.sin(radA) * Math.sin(radB) * Math.cos(radC)) - (Math.cos(radA) * Math.sin(radC));
	// 3 precalculated parts of matrix's dot product
	rZ0 = (-Math.sin(radB));
	rZ1 = Math.cos(radB) * Math.sin(radC);
	rZ2 = Math.cos(radB) * Math.cos(radC);

	//applying matrix math to every point
	for (let i = 0; i < origins.length; i++) {
		// rX, rY and rZ are not coords, but chunks of the matrix im allowed to precompute
		points[i][0] = (origins[i][0] * rX0) + (origins[i][1] * rX1) + (origins[i][2] * rX2);
		points[i][1] = (origins[i][0] * rY0) + (origins[i][1] * rY1) + (origins[i][2] * rY2);
		points[i][2] = (origins[i][0] * rZ0) + (origins[i][1] * rZ1) + (origins[i][2] * rZ2) + 400;
		let f = 300;
		points[i][0] = points[i][0] * (f / points[i][2]) + center[0];
		points[i][1] = points[i][1] * (f / points[i][2]) + center[1];
	}
	
	// drawing
	ctx.clearRect(0, 0, 400, 400);
	ctx.beginPath();	

	for (let i = 0; i < points.length; i++) {
		for (let target = 1; target <= 4; target++) {
			if (i + target >= points.length) {
				continue;
			};
			ctx.moveTo(points[i][0], points[i][1]);
			ctx.lineTo(points[i+target][0], points[i+target][1]);
			ctx.stroke();
		}
	}

	// rotations
	rotA += 0.5;
	rotB += 1;
	rotC += 2;
   
	// this little loop causes unncecesary resource usage, but roughly normalizes the fps
	// across multiple devices, i couldn't bother with a better way to do this
	do {
        var tEnd = performance.now();
    } while (tEnd - tStart < 40);
	
	setTimeout(main, 10);

}
