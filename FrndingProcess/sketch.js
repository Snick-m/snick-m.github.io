var circles = [];
var graphPoints = [];
var mainCirc;

function setup() {
	createCanvas(1400, 600);
	mainCirc = new Circle(createVector(0, 0), 50, true);
	circles.push(new Circle(createVector(500, 300), 30, false));

	circles.push(mainCirc);

	frameRate(10);
}

function draw() {
	background(51);
	translate(width/2, height/2);

	for (var i = 0; i < circles.length; i++) {
		if (!circles[i].mainCirc) {
			var x = abs(mainCirc.pos.x - circles[i].pos.x);
			var y = abs(mainCirc.pos.y - circles[i].pos.y);
			t.setMag();
			circles[i].pos = t;
		}
		circles[i].show();
	}
}