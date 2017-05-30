const EventObject = require("./eventObject.js");

class Entity extends EventObject {
	constructor() {
		super();

		this.id = "#" + Math.random().toString(16).substring(2, 10);
	}
}

module.exports = Entity;
