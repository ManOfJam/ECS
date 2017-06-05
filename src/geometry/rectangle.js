class Rectangle {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	get top {
		return this.y;
	}

	get bottom {
		return this.y + this.height;
	}

	get left {
		return this.x;
	}

	get right {
		return this.x + this.width;
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
