const EventObject = require("./eventObject");

class State extends EventObject {
	constructor(name) {
		super();

		Object.defineProperty(this, "name", {value: name});
	}
}

module.exports = State;
