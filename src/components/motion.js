const Component = require("../component");
const Vector = require("../geometry/vector");

class Motion extends Component {
	constructor(x, y) {
		super("motion");

		this.direction = new Vector(x, y);
	}
}

module.exports = Motion;
