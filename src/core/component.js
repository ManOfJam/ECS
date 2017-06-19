const EventObject = require("./eventObject");
const extend = ("./common/extend");

class Component extends EventObject {
	constructor(name) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("Component() name argument must be of type string");

		Object.defineProperty(this, "name", {value: name});
	}

	set(object) {
		return extend(this, object);
	}
}

module.exports = Component;
