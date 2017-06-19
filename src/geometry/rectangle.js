const Vector = require("./vector");

class Rectangle {
	constructor(x, y, width, height) {
		if(x && typeof x === "object") {
			if(Array.isArray(x)) {
				if(x[0] && typeof x[0] === "object") {
					this.position = new Vector(x[0]);
					this.size = new Vector(x[1], x[2]);
				}
				else if(x[1] && typeof x[1] === "object") {
					this.position = new Vector(x[0]);
					this.size = new Vector(x[1]);
				}
				else if(x[2] && typeof x[2] === "object") {
					this.position = new Vector(x[0], x[1]);
					this.size = new Vector(x[2]);
				}
				else {
					this.position = new Vector(x[0], x[1]);
					this.size = new Vector(x[2], x[3]);
				}
			}
			else {
				this.position = new Vector(x.position || [x.x, x.y]);
				this.size = new Vector(x.size || [x.width, x.height]);
			}
		}
		else if(y && typeof y === "object") {
			this.position = new Vector(x);
			this.size = new Vector(y);
		}
		else if(width && typeof width === "object") {
			this.position = new Vector(x, y);
			this.size = new Vector(width);
		}
		else {
			this.position = new Vector(x, y);
			this.size = new Vector(width, height);
		}
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
