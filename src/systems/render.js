const Rectangle = require("../geometry/rectangle");
const System = require("../core/system");
const Vector = require("../geometry/vector");
const from = require("../core/common/from");
const toRad = require("../core/common/toRad");

class Render extends System {
	constructor(canvas, options) {
		super("render", ["render", "body"]);

		const defaults = {
			width: 720,
			height: 720,
			drawBounds: false,
			fillBodies: true
		};

		const settings = from(defaults, options);

		this.canvas = Render.parseCanvas(canvas) || document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.width = typeof settings.width === "number" && settings.width >= 0 ? settings.width : defaults.width;
		this.height = typeof settings.height === "number" && settings.height >= 0 ? settings.height : defaults.height;
		this.viewport = new Rectangle(0, 0, this.width, this.height);
		this.drawBounds = typeof settings.drawBounds === "boolean" ? settings.drawBounds : defaults.drawBounds;
		this.fillBodies = typeof settings.fillBodies === "boolean" ? settings.fillBodies : defaults.fillBodies;

		canvas.setAttribute("width", this.width);
		canvas.setAttribute("height", this.height);
	}

	static parseCanvas(canvas) {
		if(typeof canvas === "string") {
			canvas = document.getElementById(canvas);
		}

		if(!canvas || canvas.tagName !== "CANVAS") {
			return null;
		}

		return canvas;
	}

	get ratio() {
		return this.height / this.viewport.height;
	}

	screenToStage(x, y) {
		const point = new Vector(x, y);

		return new Vector(
			point.x / this.ratio + this.viewport.position.x,
			point.y / this.ratio + this.viewport.position.y
		);
	}

	stageToScreen(x, y) {
		const point = new Vector(x, y);

		return new Vector(
			(point.x - this.viewport.position.x) * this.ratio,
			(point.y - this.viewport.position.y) * this.ratio
		);
	}

	renderEntity(entity) {
		const body = entity.getComponent("body");
		const render = entity.getComponent("render");
		const start = this.stageToScreen(body.vertices[0]);

		this.context.beginPath();
		this.context.moveTo(start.x, start.y);

		let i = body.vertices.length;
		while(i--) {
			const point = this.stageToScreen(body.vertices[i]);

			this.context.lineTo(point.x, point.y);
		}

		this.context.save();
		this.context.fillStyle = render.fill;
		this.context.strokeStyle = render.line;
		this.context.lineWidth = render.lineWidth;
		this.context.globalAlpha = render.opacity;

		if(render.lineWidth > 0 || !this.fillBodies) {
			this.context.stroke();
		}

		if(this.fillBodies) {
			this.context.fill();
		}

		this.context.restore();

		if(this.drawBounds) {
			const position = this.stageToScreen(body.bounds.position);
			const size = this.stageToScreen(body.bounds.size);

			this.context.strokeRect(position.x, position.y, size.x, size.y);
		}
	}

	update(entities, delta) {

		this.context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
			this.renderEntity(entity);
		}

		this.trigger("update");

		return this;
	}
}

module.exports = Render;
