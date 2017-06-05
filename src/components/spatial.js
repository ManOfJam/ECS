const Component = require("../component");
const Entity = require("../entity");

class Spatial extends Component {
	constructor(x, y, width, height) {
		super("spatial");

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	collidesWith(entity) {
		if(entity instanceof Entity)
			if(entity.hasComponent("spatial"))
	}
}

module.exports = Spatial;
