const EventObject = require("./core/eventObject");
const Vector = require("./geometry/vector");

class Mouse extends EventObject {
	constructor(target) {
		super();

		if(typeof target === "string") {
			target = document.getElementById(target);
		}

		if(!(target instanceof EventTarget)) {
			throw new TypeError("Mouse() \"target\" argument must be instance of, or ID of, an \"EventTarget\".");
		}

		Object.defineProperties(this, {
			target: {value: target},
			buttons: {value: new Set},
			position: {value: new Vector},
			click: {value: Vector}
		});

		target.addEventListener("mousemove", e => {
			this.position.x = e.offsetX;
			this.position.y = e.offsetY;

			this.trigger("move", e);
		});

		target.addEventListener("mousedown", e => {
			this.click.x = e.offsetX;
			this.click.y = e.offsetY;
			this.buttons.add(e.button);

			this.trigger("down", e);
		});

		target.addEventListener("mouseup", e => {
			this.buttons.delete(e.button);

			this.trigger("up", e);
		});

		target.addEventListener("mousewheel", e => {
			e.preventDefault();

			this.trigger("wheel", e);
		});
	}
}

module.exports = Mouse;
