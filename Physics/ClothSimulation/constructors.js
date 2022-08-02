function CircPoint(x, y, stat) {
	this.position = createVector(x, y);
	this.options = {isStatic : stat};
	this.body = bodies.circle(this.position.x, this.position.y, 0.01, this.options);

	this.show = function() {
		beginShape();
		this.body.vertices.forEach(function (vx) {
			vertex(vx.x, vx.y);
		}, this);
		endShape(CLOSE);
	}
}