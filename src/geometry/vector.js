const EventObject = require("../core/eventObject");
const toRad = require("../core/common/toRad");

class Vector extends EventObject {
	constructor(x, y) {
		super();

		if(x && typeof x === "object") {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
			}
			else if(x) {
				y = x.y;
				x = x.x;
			}
		}

		if(typeof y !== "number") {
			y = x;
		}

		this.x = typeof x === "number" ? x : 0;
		this.y = typeof y === "number" ? y : 0;
	}

	get length() {
		return Math.hypot(this.x, this.y);
	}

	get negation() {
		return new Vector(this).scale(-1);
	}

	get norm() {
		return this.length ? new Vector(this.x / this.length, this.y / this.length) : null;
	}

	translate(x, y) {
		const translation = new Vector(x, y);

		this.x += translation.x;
		this.y += translation.y;

		this.trigger("translate");

		return this;
	}

	rotate(deg) {
		const rad = toRad(deg);
		const x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
		const y = this.x * Math.sin(rad) + this.y * Math.cos(rad);

		this.x = x;
		this.y = y;

		this.trigger("rotate");

		return this;
	}

	scale(x, y) {
		const scalar = new Vector(x, y);

		this.x *= scalar.x || 1;
		this.y *= scalar.y || 1;

		this.trigger("scale");

		return this;
	}

	add(x, y) {
		return new Vector(this).translate(x, y);
	}

	subtract(x, y) {
		return new Vector(this).translate(new Vector(x, y).negation);
	}
}

module.exports = Vector;
