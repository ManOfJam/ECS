const System = require("../core/system");
const extend = require("../core/common/extend");
const toRad = require("../core/common/toRad");

class Render extends System {
	constructor(canvas, options) {
		super("render", "render", "body");

		const settings = {
			width: 800,
			height: 600
		};

		extend(settings, options);

		this.canvas = canvas;
		this.width = settings.width;
		this.height = settings.height;
	}

	get canvas() {
		return document.getElementById(this.canvasId);
	}

	set canvas(canvas) {
		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return;

		this.canvasId = canvas.id;
	}

	get height() {
		return this.canvas.getAttribute("height");
	}

	set height(height) {
		height = parseInt(height);

		if(!isNaN(height))
			this.canvas.setAttribute("height", Math.max(0, height));
	}

	get width() {
		return this.canvas.getAttribute("width");
	}

	set width(width) {
		width = parseInt(width);

		if(!isNaN(width))
			this.canvas.setAttribute("width", Math.max(0, width));
	}

	update(delta, ...entities) {
		const context = this.canvas.getContext("2d");

		context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
			const body = entity.getComponent("body");
			const render = entity.getComponent("render");
			const vertices = body.vertices;

			context.save();
			context.translate(body.position.x, body.position.y);
			context.rotate(toRad(body.angle))

			context.beginPath();
			context.moveTo(vertices[0].x, vertices[0].y);

			let i = vertices.length;
			while(i--)
				context.lineTo(vertices[i].x, vertices[i].y);
			
			context.fillStyle = render.fill;
			context.strokeStyle = render.line;
			context.lineWitdth = render.lineWidth;
			context.globalAlpha = render.opacity;

			if(render.lineWidth > 0)
				context.stroke();

			context.fill();
			context.restore();
		}
	}
}

module.exports = Render;
