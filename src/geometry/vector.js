class Vector {
	constructor(x, y) {

		if(typeof x === "object") {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
				
			}
			else if(x) {
				y = x["y"];
				x = x["x"];
			}
		}

		this.x = (parseInt(x) || 0);
		this.y = (parseInt(y) || 0);
	}

	add(x, y) {
		const addend = new Vector(x, y);
		return new Vector(this.x + addend.x, this.y + addend.y);
	}
}

module.exports = Vector;
