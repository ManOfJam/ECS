const EventObject = require("./eventObject");

class State extends EventObject {
	constructor(name) {

		Object.defineProperty(this, "name", {value: name});
	}
}

module.exports = State;
