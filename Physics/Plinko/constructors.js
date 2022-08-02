function Particle(x, y, r, stat) {
	if (!stat) {
		x += random(-5, 5);
	}
	this.position = createVector(x, y);
	this.options = {
		isStatic: stat,
		restitution: 0.25,
		friction: 0
	};
	this.body = bodies.circle(this.position.x, this.position.y, r, this.options);

	this.show = function () {
		beginShape();
		this.body.vertices.forEach(function (vx) {
			vertex(vx.x, vx.y);
		}, this);
		endShape(CLOSE);
	}
}

function Boundary(x, y, w, h) {
	this.options = {
		isStatic: true
	}
	this.body = bodies.rectangle(x, y, w, h, this.options);

	this.show = function () {
		beginShape();
		this.body.vertices.forEach(function (vx) {
			vertex(vx.x, vx.y);
		}, this);
		endShape(CLOSE);
	}
}