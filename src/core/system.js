const EventObject = require("./eventObject");

class System extends EventObject {
	constructor(name, ...required) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("System() name argument must be of type string");

		Object.defineProperties(this, {
			name: {value: name},
			required: {value: required.filter(r => typeof r === "string")}
		});
	}
}

module.exports = System;
