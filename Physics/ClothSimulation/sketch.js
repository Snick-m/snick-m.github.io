var engine = Matter.Engine.create();
var bodies = Matter.Bodies;
var World = Matter.World;
var world = engine.world;
var constraint = Matter.Constraint;

var points = [];
var constraints = [];

var stiff;

function setup() {
	createCanvas(1000, 700);
	rectMode(CENTER);
	stiff = createSlider(0, 1, 0.5, 0.05);

	// Matter.Engine.run(engine);

	for (var y = 100; y <= height - 300; y += 20) {
		for (var x = 200; x <= width - 200; x += 20) {
			// if ((x == 200 && y == 200) || (x == 800 && y == 200) || (x == 200 && y == 500) || (x == 800 && y == 500)) {
			if (y == 100) { // || (y == 400 && x == 200) || (y == 400 && x == 800)) {
				var pointy = new CircPoint(x, y, true);
			} else {
				var pointy = new CircPoint(x, y, false);
			}
			points.push(pointy);
			World.add(world, pointy.body);
		}
	}
	for (var i = 0; i < points.length; i++) {
		if (points[i + 1] && points[i].body.position.x < 800 && points[i].body.position.y < 400) {
			var cntA = constraint.create({
				bodyA: points[i].body,
				bodyB: points[i + 1].body,
				stiffness: 0.5,
				length: 20
			});
			var cntB = constraint.create({
				bodyA: points[i].body,
				bodyB: points[i + 31].body,
				stiffness: 0.5,
				length: 20
			});
			constraints.push(cntA, cntB);
			World.add(world, [cntA, cntB]);
		} else if (points[i].body.position.x == 800 && points[i + 31]) {
			var cnt = constraint.create({
				bodyA: points[i].body,
				bodyB: points[i + 31].body,
				stiffness: 0.5,
				length: 20
			});
			constraints.push(cnt);
			World.add(world, cnt);
		} else if (points[i].body.position.y == 400 && points[i + 1]) {
			var cnt = constraint.create({
				bodyA: points[i].body,
				bodyB: points[i + 1].body,
				stiffness: 0.5,
				length: 20
			});
			constraints.push(cnt);
			World.add(world, cnt);
		}
	}

	var ball = bodies.circle(400, 500, 75, { isStatic: true });
	var box = bodies.rectangle(600, 450, 100, 100, { isStatic: true });

	World.add(world, [ball, box]);

}

function draw() {
	background(51);
	fill(70, 100, 50, 100);
	stroke(20, 200, 170);

	ellipseMode(CENTER);

	ellipse(400, 500, 150, 150);
	rect(600, 450, 100, 100);

	points.forEach(function (cnt) {
		cnt.show();
		beginShape(TRIANGLE_STRIP);
		vertex(cnt.bodyA.position.x, cnt.bodyA.position.y);
		vertex(cnt.bodyB.position.x, cnt.bodyB.position.y);
		endShape();
	}, this);

	world.constraints.forEach(function (cnt) {
		beginShape();
		vertex(cnt.bodyA.position.x, cnt.bodyA.position.y);
		vertex(cnt.bodyB.position.x, cnt.bodyB.position.y);
		endShape();
		cnt.stiffness = stiff.value();
	}, this);


	Matter.Engine.update(engine);
}