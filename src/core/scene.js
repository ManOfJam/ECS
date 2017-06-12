const Entity = require("./entity");

class Scene {
	constructor() {
		Object.defineProperties(this, {
			entities: {value: new Map}
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

	removeEntiy(...entities) {
		for(const entity of entities)
			this.entities.delete(entity instanceof Entity ? entity.id : entity);

		return this;
	}

	hasEntity(...entities) {
		for(const entity of entities) {
			if(!this.entities.has(entity instanceof Entity ? entity.is : entity)) {
				return false;
			}
		}

		return true;
	}

	getEntity(entity) {
		return this.entities.get(entity instanceof Entity ? entity.is : entity);
	}
}

module.exports = Scene;
