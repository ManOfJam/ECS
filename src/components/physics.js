const Component = require("../core/component");
const extend = require("../core/common/extend");

class Physics extends Component {
	constructor(options) {
		super("physics");

		const defaults = {
			angularVelocity: 0
		};

		extend(this, defaults, options);
	}
}

module.exports = Physics;
