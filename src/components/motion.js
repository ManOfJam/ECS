const Component = require("../component");
const Vector = require("../geometry/vector");

class Motion extends Component {
	constructor(x, y, speed) {
		super("motion");

		this.direction = new Vector(x, y);
		this.speed = speed || (typeof x === "object" ? y : 0);
	}
}

module.exports = Motion;
