class Component {
	constructor(name) {
		Object.defineProperty(this, "name", {value: name});
	}
}

module.exports = Component;
