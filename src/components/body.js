const Component = require("../component.js");
const Shape = require("../geometry/shape.js");

class Body extends Component {
	constructor(shape) {
		super("body");

		if(!(shape instanceof Shape))
			return;

		this.shape = shape;
	}
}

module.exports = Body;
