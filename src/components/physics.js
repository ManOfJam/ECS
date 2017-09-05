const Component = require("../core/component");
const Vector = require("../geometry/vector");
const from = require("../core/common/from");

class Physics extends Component {
	constructor(options) {
		super("physics");

		const defaults = {
			angularVelocity: 0
		};

		const settings = from(defaults, options);

		this.angularVelocity = Number(settings.angularVelocity) || defaults.angularVelocity;
		this.velocity = new Vector(settings.velocity);
	}
}

module.exports = Physics;
