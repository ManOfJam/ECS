const Rectangle = require("../geometry/rectangle");
const System = require("../core/system");
const Vector = require("../geometry/vector");
const extend = require("../core/common/extend");
const toRad = require("../core/common/toRad");

class Render extends System {
	constructor(canvas, options) {
		super("render", "render", "body");

		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!canvas || canvas.tagName !== "CANVAS")
			return null;

		const defaults = {
			width: 720,
			height: 720,
			drawBounds: false,
			fillBodies: true
		};

		const settings = extend({}, defaults, options);

		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.width = parseFloat(settings.width) || defaults.width;
		this.height = parseFloat(settings.height) || defaults.height;
		this.viewport = new Rectangle(0, 0, this.width, this.height);
		this.drawBounds = !!settings.drawBounds;
		this.fillBodies = !!settings.fillBodies;

		canvas.setAttribute("width", this.width);
		canvas.setAttribute("height", this.height);
	}

	get ratio() {
		return this.height / this.viewport.height;
	}

	screenToStage(...point) {
		point = new Vector(...point);

		point.x = point.x / this.ratio + this.viewport.position.x;
		point.y = point.y / this.ratio + this.viewport.position.y;

		return point;
	}

	stageToScreen(...point) {
		point = new Vector(...point);

		point.x = (point.x - this.viewport.position.x) * this.ratio;
		point.y = (point.y - this.viewport.position.y) * this.ratio;

		return point;
	}

	update(entities, delta) {

		this.context.clearRect(0, 0, this.width, this.height);

		for(const entity of entities) {
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

			if(render.lineWidth > 0 || !this.fillBodies)
				this.context.stroke();

			if(this.fillBodies)
				this.context.fill();

			this.context.restore();

			if(this.drawBounds) {
				const position = this.stageToScreen(body.bounds.position);
				const size = this.stageToScreen(body.bounds.size);

				this.context.strokeRect(position.x, position.y, size.x, size.y);
			}
		}

		this.trigger("update");

		return this;
	}
}

module.exports = Render;
