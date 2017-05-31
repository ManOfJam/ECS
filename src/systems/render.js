const extend = require("../common/extend.js");
const System = require("../system.js");

class Render extends System {
	constructor(canvas, options) {
		super("transform");

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

		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	}

	update(entityPool, delta) {
		const entities = this.getEntities(entityPool);
	}
}

module.exports = Render;
