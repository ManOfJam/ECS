const Component = require("../core/component");
const Vector = require("../geometry/vector");
const extend = require("../core/common/extend");

class Physics extends Component {
	constructor(options) {
		super("physics");

		const settings = {
			angularVelocity: 0,
			velocity: new Vector
		};

		extend(settings, options);

		this.angularVelocity = typeof settings.angularVelocity === "number" ? settings.angularVelocity : 0;
		this.velocity = new Vector(settings.velocity);
	}
}

module.exports = Physics;
