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

	overlaps(space) {
		if(space instanceof Entity) {
			space = space.getComponent("spatial");
		}

		if(!(space instanceof Spatial)) {
			return null;
		}

		return (
			this.x + this.width < space.x && 
			this.x > space.x + space.width &&
			this.y + this.height < space.y &&
			this.y > space.y + space.height
		);
	}

	inside(space) {
		if(space instanceof Entity) {
			space = space.getComponent("spatial");
		}

		if(!(space instanceof Spatial)) {
			return null;
		}

		return (
			this.x >= space.x &&
			this.x + this.width <= space.x + space.width &&
			this.y >= space.y &&
			this.y + this.height <= space.y + space.height
		);
	}
}

module.exports = Spatial;
