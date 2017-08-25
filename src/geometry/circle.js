const Vector = require("./vector");

class Circle {
	constructor(x, y, r) {
		if(x && typeof x === "object") {
			this.center = new Vector(x.center || x);
			r = x.radius || y;
		}

		this.radius = typeof r === "number" ? r : 0;
	}

	overlaps(circle) {
		circle = new Circle(circle);

		return (new Vector(this.center - circle.center)).length < this.radius + circle.radius;
	}

	inside(circle) {
		circle = new Circle(circle);

		return (new Vector(this.center - circle.center)).length < this.radius;
	}
}

module.exports = Circle;
