class Component {
	constructor(name) {
		if(typeof name !== "string")
			throw new TypeError("Component() name argument must be of type string");

		Object.defineProperty(this, "name", {
			value: name
		});
	}
}

module.exports = Component;
