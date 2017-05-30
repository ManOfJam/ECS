const extend = require("../common/extend.js");
const System = require("../system.js");

class Render extends System {
	constructor(canvas, options) {
		super();

		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return;

		const settings = {
			width: 720,
			height: 720
		};

		extend(settings, options);

		canvas.setAttribute("width", settings.width);
		canvas.setAttribute("height", settings.height);
	}
}

module.exports = Render;
