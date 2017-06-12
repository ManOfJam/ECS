const Vector = require("./vector");

class Rectangle {
	constructor(x, y, width, height) {
		super();

		if(typeof x === "object") {
			x = new Vector(x);
			height = width;
			width = y;
		}

		if(typeof width === "object") {
			width = new Vector(width);
		}

		this.position = new Vector(x, y);
		this.size = new Vector(width, height);
	}
}

module.exports = Rectangle;
