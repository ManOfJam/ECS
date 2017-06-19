const Entity = require("./entity");
const EventObject = require("./eventObject");

class Scene extends EventObject {
	constructor(name) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("Scene() name argument must be of type string");

		Object.defineProperties(this, {
			entities: {value: new Map},
			name: {value: name}
		});
	}

	addEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity) {
				this.entities.set(entity.id, entity);
			}
		}

		return this;
	}

	removeEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity || typeof entity === "sting") {
				this.entities.delete(entity.id || entity);
			}
		}

		return this;
	}

	hasEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity || typeof entity === "string") {
				if(!(this.entities.has(entity.id || entity))) {
					return false;
				}
			}
		}

		return true;
	}

	getEntity(entity) {
		if(entity instanceof Entity || typeof entity === "string")
			return this.scenes.get(entity.id || entity);
	}
}

module.exports = Scene;
