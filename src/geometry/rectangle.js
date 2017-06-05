const Vector = require("./vector");

class Rectangle {
	constructor(x, y, width, height) {
		this.position = new Vector(x, y);
		this.size = new Vector(width, height);
	}

	get top {
		return this.position.y;
	}

	get bottom {
		return this.position.y + this.size.y;
	}

	get left {
		return this.position.x;
	}

	get right {
		return this.position.x + this.size.x;
	}

	overlaps(rectangle) {
		if(!(rectangle instanceof Rectangle)) {
			return null;
		}

		return (
			this.top > rectangle.bottom &&
			this.bottom < rectangle.top &&
			this.left > rectangle.right &&
			this.right < rectangle.left
		);
	}

	inside(rectangle) {
		if(!(rectangle instanceof Rectangle)) {
			return null;
		}

		return (
			this.top >= rectangle.top &&
			this.bottom <= rectangle.bottom &&
			this.left >= rectangle.left &&
			this.right <= rectangle.right
		);
	}
}

module.exports = Rectangle;
