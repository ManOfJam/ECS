const EventObject = require("./eventObject");

class Component extends EventObject {
	constructor(name) {
		super();
		
		Object.defineProperty(this, "name", {value: name});
	}
}

module.exports = Component;
