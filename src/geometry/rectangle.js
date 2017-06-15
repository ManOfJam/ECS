const Vector = require("./vector");

class Rectangle {
	constructor(x, y, width, height) {
		this.set(x, y, width, height)
	}

	get width() {
		return this.size.x;
	}

	get height() {
		return this.size.y;
	}

	get left() {
		return this.position.x;
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.position.y;
	}

	get bottom() {
		return this.top + this.height;
	}

	set(x, y, width, height) {
		if(x instanceof Object) {
			this.position = new Vector(x.position || x);
			this.size = new Vector(x.size || [y, width]);
		}
		else if(y instanceof Object) {
			this.position = new Vector(x);
			this.size = new Vector(y);

		}
		else if(width instanceof Object) {
			this.position = new Vector(x, y);
			this.size = new Vector(width);
		}
		else {
			this.position = new Vector(x, y);
			this.size = new Vector(width, height);
		}
	}

	overlaps(rectangle) {
		rectangle = new Rectangle(rectangle);
		return !(
			this.left > rectangle.right ||
			this.right < rectangle.left ||
			this.top > rectangle.bottom ||
			this.bottom < rectangle.top
		);
	}

	inside(rectangle) {
		rectangle = new Rectangle(rectangle);
		return (
			this.left >= rectangle.left &&
			this.right <= rectangle.right &&
			this.top >= rectangle.top &&
			this.bottom <= rectangle.bottom
		);
	}
}

module.exports = Rectangle;
