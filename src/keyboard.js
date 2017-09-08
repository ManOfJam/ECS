const EventObject = require("./core/eventObject");

class Keyboard extends EventObject {
	constructor() {
		super();

		Object.defineProperty(this, "keys", {value: new Set});

		window.addEventListener("keydown", e => {
			this.keys.add(e.code);
			this.trigger("keydown", e);
		});

		window.addEventListener("keyup", e => {
			this.keys.delete(e.code);
			this.trigger("keydown", e);
		});
	}
}

module.exports = Keyboard;
