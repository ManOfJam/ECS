class Vector {
	constructor(x, y) {
		this.set(x, y);
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

		this.x = parseInt(x) || 0;
		this.y = parseInt(y) || 0;

		return this;
	}

	add(x, y) {
		const addend = new Vector(x, y);
		return this.set(this.x + addend.x, this.y + addend.y);
	}

	scale(x, y) {
		const scalar = new Vector(x, y);
		return this.set(this.x * scalar.x, this.y * scalar.y);
	}
}

module.exports = Vector;
