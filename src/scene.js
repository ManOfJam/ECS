const Entity = require("./entity");
const EventObject = require("./eventObject");
const State = require("./state");

class Scene extends State {
	constructor(name) {
		super(name);

		Object.defineProperties(this, {
			entities: {value: new Map}
		});
	}

	addEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity) {
				this.entities.set(entity.name, entity);
			}
		}

		return this;
	}

	removeEntiy(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity) {
				this.entities.delete(entity.name, entity);
			}
		}

		return this;
	}

	hasEntity(...entities) {
		for(const entity of entities) {
			if(!this.entities.has(entity)) {
				return false;
			}
		}

		return true;
	}

	getEntity(entity) {
		return this.entities.get(entity);
	}
}

module.exports = Scene;
