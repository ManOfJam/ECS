const Component = require("../core/component");
const extend = require("../core/common/extend");

class Render extends Component {
	constructor(options) {
		super("render");

		this.fill = options.fill || "#000";
		this.line = options.line || "#000";
		this.lineWidth = Math.max(0, parseInt(options.lineWidth)) || 0;
		this.opacity = Math.max(0, Math.min(1, parseInt(options.lineWidth))) || 1;
	}
}

module.exports = Render;
