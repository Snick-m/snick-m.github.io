var engine = Matter.Engine.create();
var bodies = Matter.Bodies;
var World = Matter.World;
var world = engine.world;
var constraint = Matter.Constraint;

var plinkos = [];
var particles = [];
var bounds = [];

var spacing, cols, rows;

var pegR = 17.5,
	plinkoR = 7.5;

function makeOrbeez() {
	for (var x = 300; x <= width - 300; x += spacing * 2) {
		var particle = new Particle(x, 25, plinkoR, false);
		particles.push(particle);
		World.add(world, particle.body);
	}
}

function setup() {
	createCanvas(800, 900);
	rectMode(CENTER);

	spacing = 50,
		cols = 16,
		rows = 11;

	// Matter.Engine.run(engine);

	for (var i = 0; i <= rows; i++) {
		for (var j = 0; j <= cols; j++) {
			if (i == 0) {
				var bound = new Boundary(j * spacing, height - 50, pegR - 10, 200);
			}
			if (i % 2 != 0) {
				var plinko = new Particle(j * spacing, i * spacing + 150, pegR, true);
			} else {
				var plinko = new Particle(j * spacing + 25, i * spacing + 150, pegR, true);
			}
			bounds.push(bound);
			plinkos.push(plinko);
			World.add(world, [plinko.body, bound.body]);
		}
	}

	var ground = new Boundary(width / 2, height + 25, width, 50);
	World.add(world, ground.body);

	makeOrbeez();
}

function draw() {
	background(51);
	fill(70, 100, 50, 100);
	stroke(20, 200, 170);

	Matter.Engine.update(engine);

	if (frameCount % 60 == 0) {
		// var particle = new Particle(width / 2, 50, plinkoR, false);
		// particles.push(particle);
		// World.add(world, particle.body);
		
		makeOrbeez();
	}

	plinkos.forEach(function (peg) {
		peg.show();
	}, this);

	stroke(200, 20, 200)
	fill(200, 20, 200, 100);

	bounds.forEach(function (bnd) {
		bnd.show();
	}, this);

	stroke(20, 200, 200, 150);
	fill(20, 200, 200, 100);

	particles.forEach(function (pnt) {
		pnt.show();
		if (pnt.body.position.y > height) {
			particles.slice(pnt);
		}
	}, this);
}