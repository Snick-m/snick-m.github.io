function Circle(posVec, r, id, rotateWill, rotMark) {
	this.pos = posVec
	this.id = id,
	this.r = r,

	this.update = function() {
		if (circles[id-1] && rotateWill) {
			translate(circles[id-1].pos.x, circles[id-1].pos.y);
			this.pos.rotate(degrees((PI/sin(rotMark))*(PI/cos(rotMark))/2));
		}
	}

	this.display = function() {
		fill(255, 100, 200, 100);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}
}

function graphPoint(posVec) {
	this.pos = posVec,

	this.update = function() {
		this.pos.x += 4;
	},

	this.display = function() {
		stroke(255,200);
		strokeWeight(5);
		point(this.pos.x, this.pos.y);
	},

	this.outside = function() {
		if (this.pos.x > width) {
			return true;
		} else {
			return false;
		}
	}
}