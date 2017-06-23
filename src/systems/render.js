const Rectangle = require("../geometry/rectangle");
const System = require("../core/system");
const extend = require("../core/common/extend");
const toRad = require("../core/common/toRad");

class Render extends System {
	constructor(canvas, options) {
		super("render", "render", "body");

		this.canvas = canvas;

		if(!this.canvas)
			return null;

		const settings = {
			width: 720,
			height: 720,
			drawBounds: false
		};

		extend(this, settings, options);

		this.viewport = new Rectangle(0, 0, this.width, this.height);
	}

	get canvas() {
		return document.getElementById(this.canvasId);
	}

	set canvas(canvas) {
		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return null;

		this.canvasId = canvas.id || (canvas.id = "ECS-canvas");
	}

	get context() {
		return this.canvas ? this.canvas.getContext("2d") : null;
	}

	get height() {
		return Number(this.canvas.getAttribute("height"));
	}

	set height(height) {
		height = parseInt(height);

		if(!isNaN(height))
			this.canvas.setAttribute("height", Math.max(0, height));
	}

	get width() {
		return Number(this.canvas.getAttribute("width"));
	}

	set width(width) {
		width = parseInt(width);

		if(!isNaN(width))
			this.canvas.setAttribute("width", Math.max(0, width));
	}

	update(entities, delta) {
		const context = this.context;
		context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
			const body = entity.getComponent("body");
			const render = entity.getComponent("render");
			const vertices = body.vertices;

			context.save();

			context.translate(
				-this.viewport.position.x,
				-this.viewport.position.y
			);
			
			context.scale(
				this.width / this.viewport.width,
				this.height / this.viewport.height
			);

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

			if(this.drawBounds) {
				context.strokeRect(
					body.bounds.position.x,
					body.bounds.position.y,
					body.bounds.size.x,
					body.bounds.size.y
				);
			}
		}

		this.trigger("update");

		return this;
	}
}

module.exports = Render;
