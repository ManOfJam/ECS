const EventObject = require("./eventObject.js");
const Component = require("./component.js");
const componentsLib = require("./components");

class Entity extends EventObject {
	constructor(...components) {
		super();

		this.id = "#" + Math.random().toString(16).substring(2, 10);
		this.addComponent.apply(this, components);
	}

	addComponent(...components) {
		for(let component of components) {
			if(typeof component === "string") {
				const compConstructor = componentsLib[component.substring(0, 1).toUpperCase() + component.substring(1)];

				if(typeof compConstructor === "function") {
					component = new compConstructor;
				}
			}

			if(component instanceof Component) {
				this[component.name] = component;
			}
		}
	}
}

module.exports = Entity;
