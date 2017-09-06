const Component = require("../core/component");
const from = require("../core/common/from");

class Render extends Component {
	constructor(options) {
		super("render");

		const defaults = {
			fill: "#000",
			line: "#000",
			lineWidth: 0,
			opacity: 1
		};
		
		const settings = from(defaults, options);

		this.fill = settings.fill;
		this.line = settings.line;
		this.lineWidth = settings.lineWidth;
		this.opacity = settings.opacity;
	}
}

module.exports = Render;
