const EventObject = require("./eventObject.js");
const Component = require("./component.js");

class Entity extends EventObject {
	constructor(...components) {
		super();

		this.id = "#" + Math.random().toString(16).substring(2, 10);
		this.addComponent.apply(this, components);
	}

	addComponent(...components) {
		components.forEach(c => {
			if(c instanceof Component) this[c.name] = c;
		});
	}
}

module.exports = Entity;
