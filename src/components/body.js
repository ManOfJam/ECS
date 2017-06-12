const Component = require("../core/component");
const Vector = require("../geometry/vector");

class Body extends Component {
	constructor() {
		super("body");

		this.angle = 0;
		this.position = new Vector;
		this.vertices = []; 
	}

	addVertex(x, y) {
		this.vertices.push(new Vector(x, y));

		return this;
	}

	addVertices(...vertices) {
		for(const vertext of vertices) {
			this.addVertex(vertext);
		}

		return this;
	}

	translate(x, y) {
		this.position.translate(x, y);

		return this;
	}

	rotate(deg, about) {
		this.angle = (this.angle + deg) % 360;

		return this;
	}
}

module.exports = Body;
