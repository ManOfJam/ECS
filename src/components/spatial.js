const Component = require("../component");
const Vector = require("../geometry/vector");

class Spatial extends Component {
	constructor(x, y, width, height) {
		super("spatial");

		this.position = new Vector(x, y);
		this.size = new Vector(width, height);
	}

	get top() {
		return this.position.y;
	}

	get bottom() {
		return this.position.y + this.size.y;
	}

	get left() {
		return this.position.x;
	}

	get right() {
		return this.position.x + this.size.y;
	}

	get height() {
		return this.size.y;
	}

	get width() {
		return this.size.x;
	}

	translate(x, y) {
		this.position.add(x, y);
	}

	scale(x, y) {
		this.size.scale(x, y);
	}

	overlaps(space) {
		if(!(space instanceof Spatial))
			return;

		return !(
			this.top > space.bottom ||
			this.bottom < space.top ||
			this.left > space.right ||
			this.right < space.left
		);
	}

	inside(space) {
		if(!(space instanceof Spatial))
			return;

		return !(
			this.top < space.top ||
			this.bottom > space.bottom ||
			this.left < space.left ||
			this.right > space.right
		);
	}
}

module.exports = Spatial;
