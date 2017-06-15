const toRad = require("../core/common/toRad");

class Vector {
	constructor(x, y) {
		this.set(x, y);
	}

	get length() {
		return Math.hypot(this.x, this.y);
	}

	get norm() {
		if(!this.length)
			return new Error("Cannot normalise a zero length vector.");
		
		return new Vector(this.x / this.length, this.y / this.length);
	}

	get negation() {
		return new Vector(this).scale(-1);
	}

	set(x, y) {
		if(x instanceof Object) {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
			}
			else if(x) {
				y = x.y;
				x = x.x;
			}
		}
		
		if(isNaN(parseInt(y))) {
			y = x;
		}

		this.x = Math.floor(parseFloat(x) * 1000) / 1000 || 0;
		this.y = Math.floor(parseFloat(y) * 1000) / 1000 || 0;

		return this;
	}

	translate(x, y) {
		const translation = new Vector(x, y);
		return this.set(this.x + translation.x, this.y + translation.y);
	}

	rotate(deg) {
		const rad = toRad(deg);
		return this.set(
			this.x * Math.cos(rad) - this.y * Math.sin(rad),
			this.x * Math.sin(rad) + this.y * Math.cos(rad),
		);
	}

	scale(x, y) {
		const scalar = new Vector(x, y);
		return this.set(this.x * scalar.x, this.y * scalar.y);
	}

	add(x, y) {
		return new Vector(this).translate(x, y);
	}

	subtract(x, y) {
		return new Vector(this).translate(new Vector(x, y).scale(-1));
	}

	static parseVector(x, y) {
		if(x instanceof Object) {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
			}
			else {
				y = x.y;
				x = x.x;
			}
		}
		
		if(isNaN(parseInt(y))) {
			y = x;
		}

		if(typeof x === "number" && typeof y === "number") {
			return new Vector(x, y);
		}
		else {
			return null;
		}
	}
}

module.exports = Vector;
