const Component = require("../core/component");
const extend = require("../core/common/extend");

class Render extends Component {
	constructor(options) {
		super("render");

		const settings = {
			fill: "#000",
			line: "#000",
			lineWidth: 0,
			opacity: 1
		};
		
		extend(this, settings, options);
	}
}

module.exports = Render;
