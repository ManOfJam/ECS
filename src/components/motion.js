const Component = require("../component");

class Motion extends Component {
	constructor(x, y) {
		super("motion");

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
}

module.exports = Motion;
