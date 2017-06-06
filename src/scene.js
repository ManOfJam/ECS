const Entity = require("./entity");
const EventObject = require("./eventObject")

class Scene extends EventObject {
	constructor(name) {
		super();
		
		this.name = name;
		this.entities = {};
	}

	addEntity(...entities) {
		entities.forEach(e => {
			if(e instanceof Entity) this.entities[e.id] = e;
		});
	}
}

module.exports = Scene;
