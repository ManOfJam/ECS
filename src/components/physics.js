const Component = require("../core/component");
const Vector = require("../geometry/vector");
const extend = require("../core/common/extend");

class Physics extends Component {
	constructor(options) {
		super("physics");

		const defaults = {
			angularVelocity: 0
		};

		const settings = extend({}, settings, options);

		this.angularVelocity = Number(settings.angularVelocity) || defaults.angularVelocity;
		this.velocity = new Vector(settings.velocity);
	}
}

module.exports = Physics;
