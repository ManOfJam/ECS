const EventTarget = require("../core/eventTarget");
const Vector = require("../geometry/vector");

class Mouse extends EventTarget {
	constructor(target) {
		super();

		this.target = target;

		if(!this.target)
			return null;

		this.buttons = new Set;
		this.position = new Vector;
		this.click = new Vector;
	}

	get target() {
		return document.getElementById(this.targetId);
	}

	set target(target) {
		if(typeof target === "string")
			target = document.getElementById(target);

		if(!(target instanceof EventTarget))
			return null;

		this.targetId = target.id || (target.id = "ECS-target");

		target.addEventListener("mousemove", this.mousemove.bind(this));
		target.addEventListener("mousedown", this.mousedown.bind(this));
		target.addEventListener("mouseup", this.mouseup.bind(this));
		target.addEventListener("mousewheel", this.mousewheel.bind(this));
	}

	mousemove(e) {
		this.position.x = e.offsetX;
		this.position.y = e.offsetY;

		this.trigger("mousemove", e);
	}

	mousedown(e) {
		this.click.x = e.offsetX;
		this.click.y = e.offsetY;
		this.buttons.add(e.button);

		this.trigger("mousedown", e);
	}

	mouseup(e) {
		this.buttons.delete(e.button);

		this.trigger("mouseup", e);
	}

	mousewheel(e) {
		e.preventDefault();

		this.trigger("wheel", e);
	}
}

module.exports = Mouse;
