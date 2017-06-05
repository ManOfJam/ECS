const EventObject = require("./eventObject.js");
const Component = require("./component.js");
const componentsLib = require("./components");
const extend = require("./common/extend.js");

class Entity extends EventObject {
	constructor(...components) {
		super();

		Object.defineProperty(this, "id", {value: "#" + Math.random().toString(16).substring(2, 10)});

		this.components = new Map;
		this.addComponent.apply(this, components);
	}

	addComponent(...components) {
		for(let component of components) {
			if(component instanceof Component) {
				this.components.set(component.name, component);
			}
		}

		return this;
	}

	removeComponent(...components) {
		for(let component of components) {
			if(component instanceof Component) {
				this.components.delete(component.name);
			}
		}

		return this;
	}

	hasComponent(...components) {
		for(let component of components) {
			if(!this.components.has(component)) {
				return false;
			}
		}

		return true;
	}
}

module.exports = Entity;
