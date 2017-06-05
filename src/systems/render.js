const extend = require("../common/extend.js");
const System = require("../system.js");

class Render extends System {
	constructor(canvas, options) {
		super("transform", "size");

		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return;

		const settings = {
			width: 720,
			height: 720
		};

		extend(this, settings, options);

		canvas.setAttribute("width", settings.width);
		canvas.setAttribute("height", settings.height);

		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	}

	update(entityPool, delta) {
		const entities = this.getEntities.apply(this, entityPool);

		this.context.clearRect(0, 0, this.width, this.height);
		this.context.beginPath();

		for(const entity of entities) {
			this.context.rect(entity.transform.position.x, entity.transform.position.y, entity.size.x, entity.size.y);
			entity.trigger("update");
		}

		this.context.stroke();
	}
}

module.exports = Render;
