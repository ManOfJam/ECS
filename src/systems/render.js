const Entity = require("../entity");
const System = require("../system");
const extend = require("../common/extend");

class Render extends System {
	constructor(canvas, options) {
		super("render", "spatial");

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

	update(entities, delta) {
		entities = entities.filter(
			e => e instanceof Entity && this.required.every(r => e.hasComponent(r))
		);

		this.context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
			const spatial = entity.getComponent("spatial");

			this.context.fillRect(spatial.left, spatial.top, spatial.width, spatial.height);

			entity.trigger("update");
		}

		return this;
	}
}

module.exports = Render;
