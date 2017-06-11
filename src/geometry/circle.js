const Shape = require("./shape");

class Circle extends Shape {
	constructor(x, y, r, deg) {
		super(deg);
	}
}

module.exports = Circle;
