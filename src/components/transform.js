const Component = require("../component.js");
const Vector = require("../geometry/vector.js");

class Transform extends Component {
	constructor(x, y, deg) {
		super("transform");

		if(typeof x === "object") {
			if(Array.isArray(x)) {
				deg = y;
				y = x[0];
				x = x[1];
			}
			else if(x) {
				deg = y;
				y = x.y;
				x = x.x;
			}
		}

		this.position = new Vector(x, y);
		this.angle = (parseInt(deg) || 0) % 360;
	}

	translate(x, y) {
		this.position = this.position.add(new Vector(x, y));
	}

	rotate(deg) {
		this.angle = (this.angle + deg) % 360;
	}
}

module.exports = Transform;
