const Entity = require("./entity.js");
const EventObject = require("./eventObject.js")

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
