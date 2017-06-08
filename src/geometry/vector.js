class Vector {
	constructor(x, y) {
		this.set(x, y);
	}

	get length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	get norm() {
		return new Vector(this.x / this.length, this.y / this.length);
	}

	set(x, y) {
		if(typeof x === "object") {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
			}
			else if(x) {
				y = x.y;
				x = x.x;
			}
		}
		else if(x && isNaN(parseInt(y))) {
			y = x;
		}

		this.x = parseFloat(x) || 0;
		this.y = parseFloat(y) || 0;

		return this;
	}

	translate(x, y) {
		const translation = new Vector(x, y);
		return this.set(this.x + translation.x, this.y + translation.y);
	}

	scale(x, y) {
		const scalar = new Vector(x, y);
		return this.set(this.x * scalar.x, this.y * scalar.y);
	}

	static add(v1, v2) {
		return new Vector(v1).add(v2);
	}

	static scale(v1, v2) {
		return new Vector(v1).scale(v2);
	}
}

module.exports = Vector;
