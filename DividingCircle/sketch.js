var slider1;
var slider2;
var radius;
var angle;

radius = 200;

function setup() {
	createCanvas(1600,800);
	ellipseMode(CENTER);
	slider1 = createSlider(1, 50, 2, 1);
	slider2 = createSlider(50, 600, 50, 10);
}

function draw() {
	translate(width/2, height/2);
	background(51);

	stroke(50, 150, 200, 140);
	strokeWeight(5);
	noFill();

	radius = slider2.value();
	angle = calcAngle(slider1.value());

	ellipse(0, 0, radius*2, radius*2);
	makeDivs();
}

function calcAngle(parts) {
	var a = TWO_PI/parts;
	return a ;
}

function makeDivs() {
	push();
	for (i = 0; i <= slider2.value(); i++) {
		stroke(230, 100, 100, 50);
		strokeWeight(3);
		line(0, 0, radius-5, 0);
		rotate(angle);
	}
	print((TWO_PI * slider2.value())/5);
	pop();
}