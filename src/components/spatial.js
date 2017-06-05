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

	get top {
		return this.y;
	}

	get bottom {
		return this.y + this.height;
	}

	get left {
		return this.x;
	}

	get right {
		return this.x + this.width;
	}

	overlaps(space) {
		if(space instanceof Entity) {
			space = space.getComponent("spatial");
		}

		if(!(space instanceof Spatial)) {
			return null;
		}

		return (
			this.top > space.bottom &&
			this.bottom < space.top &&
			this.left > space.right &&
			this.right < space.left
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
			this.top >= space.top &&
			this.bottom <= space.bottom &&
			this.left >= space.left &&
			this.right <= space.right
		);
	}
}

module.exports = Spatial;
