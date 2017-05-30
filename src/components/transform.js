const Component = require("../component.js");
const Vector = require("../geometry/vector.js");

class Transform extends Component {
	constructor() {
		super("transform");

		this.position = new Vector();
		this.angle = 0;
	}

	translate(x, y) {
		this.position = this.position.add(new Vector(x, y));
	}

	rotate(deg) {
		this.angle = (this.angle + deg) % 360;
	}
}

module.exports = Transform;
