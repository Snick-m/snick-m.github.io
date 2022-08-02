var positions = [];
var grid = [[[]]];
var tVal = 0.5;
var tryX = 1;
var doCalc = true;
var firstPos;

var x;
var y;

function setup() {
	createCanvas(1000, 800, WEBGL);
	angleMode(degrees);
}

function draw() {
	tVal += 0.02;
	if (tVal > 6.2) {
		tVal = 0
	}
	background(51);
	if (doCalc) {
		calcCoords(20, tVal);
	}
	fill(50, 255, 50, 50);
	for (i = 0; i < positions.length; i++) {
		push();
		rotateX(radians(180));
		translate(positions[i].x, positions[i].y);
		sphere(10);
		pop();
	}
}

function calcCoords(r, t) {
	x = floor(r * (16 * sin(t) * sin(t) * sin(t)));
	y = floor(r * (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - 4 * cos(t)));

	positions.push(createVector(x, y));
	if (tryX == 1) {
		firstPos = createVector(x, y);
	} else if (x === firstPos.x && y === firstPos.y) {
		doCalc = false ;
	}
	tryX += 1;
}
