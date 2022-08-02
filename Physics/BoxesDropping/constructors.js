function Boxy(x, y, w, h) {
	this.position = createVector(x, y);
	this.options = {restitution : 0.7};
	this.body = bodies.rectangle(this.position.x, this.position.y, w, h, this.options);

	this.show = function() {
		beginShape();
		this.body.vertices.forEach(function (vx) {
			vertex(vx.x, vx.y);
		}, this);
		endShape(CLOSE);
	}
}