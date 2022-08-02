function Circle(posVec, r, mainEv) {
	this.pos = posVec,
	this.r = r,
	this.mainCirc = mainEv

	this.update = function() {
	}

	this.show = function() {
		noStroke();
		fill(50, 100, 250, 100);
		ellipse(this.pos.x, this.pos.y, this.r)
	}
}