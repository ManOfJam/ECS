const Shape = require("./shape");
const Vector = require("./vector");

class Rectangle extends Shape {
	constructor(x, y, width, height, deg) {
		super();

		if(typeof x === "object") {
			x = new Vector(x);
			deg = height;
			height = width;
			width = y;
		}

		if(typeof width === "object") {
			width = new Vector(width);
			deg = height;
		}

		this.angle = (parseFloat(deg) % 360) || 0;
		this.position = new Vector(x, y);
		this.size = new Vector(width, height);
	}
}

module.exports = Rectangle;
