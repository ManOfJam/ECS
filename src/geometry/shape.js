class Shape {
	constructor(deg) {
		this.angle = (parseFloat(deg) % 360) || 0;
	}
}

module.exports = Shape;
