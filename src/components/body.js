const Component = require("../core/component");
const Rectangle = require("../geometry/Rectangle");
const Vector = require("../geometry/vector");

class Body extends Component {
	constructor() {
		super("body");

		this.vertices = [];
	}

	get bounds() {
		const position = {
			x: Math.min(...this.vertices.map(vertext => vertext.x)),
			y: Math.min(...this.vertices.map(vertext => vertext.y))
		};

		const size = {
			x: Math.max(...this.vertices.map(vertext => vertext.x)) - position.x,
			y: Math.max(...this.vertices.map(vertext => vertext.y)) - position.y
		};

		return new Rectangle(position.x, position.y, size.x, size.y);
	}

	get center() {
		return new Vector(
			this.bounds.position.x + (this.bounds.size.x / 2),
			this.bounds.position.y + (this.bounds.size.y / 2)
		);
	}

	get centroid() {
		return new Vector(
			this.vertices.reduce((acc, cur) => acc + cur.x, 0) / this.vertices.length,
			this.vertices.reduce((acc, cur) => acc + cur.y, 0) / this.vertices.length
		);
	}

	addVertex(x, y) {
		this.vertices.push(new Vector(x, y));

		return this;
	}

	addVertices(...vertices) {
		for(const vertext of vertices)
			this.addVertex(vertext);

		return this;
	}

	translate(x, y) {
		const translation = new Vector(x, y);

		for(const vertext of this.vertices)
			vertext.translate(translation);

		return this;
	}

	rotate(deg, about) {
		deg = (parseFloat(deg) % 360) || 0;
		about = Vector.parseVector(about) || this.centroid;

		for(const vertext of this.vertices) {
			vertext.translate(about.negation);
			vertext.rotate(deg);
			vertext.translate(about);
		}

		return this;
	}
}

module.exports = Body;
