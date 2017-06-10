const Entity = require("./entity");

class System {
	constructor(name, ...required) {
		
		Object.defineProperties(this, {
			name: {value: name},
			required: {value: required.filter(r => typeof r === "string")}
		});
	}
}

module.exports = System;
