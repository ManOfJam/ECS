const Component = require("../component");
const Vector = require("../geometry/vector");

class Motion extends Component {
	constructor(x, y) {
		super("motion");

		this.direction = new Vector();
		this.speed = 1;
		this.movement = { x, y };
	}

	get movement() {
		return Vector.scale(this.direction, this.speed);
	}

	set movement(v) {
		v = new Vector(v);

		this.direction = v.norm;
		this.speed = v.length;
	}
}

module.exports = Motion;
