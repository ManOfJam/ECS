const System = require("../core/system");

class Keyboard extends System {
	constructor() {
		super("keyboard");

		Object.defineProperty(this, "keys", {value: new Set});

		window.addEventListener("keydown", this.keydown.bind(this));
		window.addEventListener("keyup", this.keyup.bind(this));
	}

	keydown(e) {
		this.keys.add(e.code);
		this.trigger("keydown", e);
	}

	keyup(e) {
		this.keys.delete(e.code);
		this.trigger("keydown", e);
	}
}

module.exports = Keyboard;
