const System = require("../system");
const toRad = require("../common/toRad");

class Render extends System {
	constructor(canvas, width, height) {
		super("shape", "render");

		this.canvas = canvas;

		if(this.canvas) {
			this.width = typeof width === "number" ? width : 720;
			this.height = typeof height === "number" ? height : this.width;
		}
	}

	get canvas() {
		return document.getElementById(this.canvasId);
	}

	set canvas(canvas) {
		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return null;

		this.canvasId = canvas.id;
	}

	get context() {
		return this.canvas.getContext("2d");
	}

	get width() {
		return Number(this.canvas.getAttribute("width"));
	}

	set width(width) {
		width = parseInt(width);

		if(!isNaN(width))
			this.canvas.setAttribute("width", Math.max(0, width));
	}

	get height() {
		return Number(this.canvas.getAttribute("height"));
	}

	set height(height) {
		height = parseInt(height);

		if(!isNaN(height))
			this.canvas.setAttribute("height", Math.max(0, height));
	}

	update(...entities) {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
			const shape = entity.getComponent("shape");
			const render = entity.getComponent("render");

			context.save();

			switch(shape.constructor.name) {
				case "Rectangle": {
					context.translate(shape.position.x, shape.position.y);
					context.rotate(toRad(shape.angle));
					context.fillStyle = render.color;

					context.fillRect(0, 0, shape.size.x, shape.size.y);
					break;
				}

				case "Circle": {
					break;
				}
			}

			context.restore();
		}

		return this;
	}
}

module.exports = Render;
