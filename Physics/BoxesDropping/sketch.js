var world;
var engine;
var bodies;
var World;
var boxes = [];
var box1;
var ground;

function setup() {
	createCanvas(1000, 700);
	rectMode(CENTER);

	engine = Matter.Engine.create();
	bodies = Matter.Bodies;
	World = Matter.World;

	world = engine.world;

	ground = bodies.rectangle(width / 2, height, width, 50, { isStatic: true });
	// box1 = new Box1();

	World.add(world, ground);
	Matter.Engine.run(engine);
}

function mouseDragged() {
	var boxy = new Boxy(mouseX, mouseY, floor(random(30, 50)), floor(random(40, 60)));
	boxes.push(boxy);
	World.add(world, boxy.body);
}

function draw() {
	background(51);
	fill(90);
	stroke(200);
	rect(ground.position.x, ground.position.y, width, 50);
	
	boxes.forEach(function (bx) {
		bx.show();
	}, this);
}