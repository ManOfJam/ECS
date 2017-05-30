const System = require("./system.js");
const Entity = require("./entity.js");
const EventObject = require("./eventObject.js")

class Scene extends EventObject {
	constructor(...systems) {
		super();
		
		this.systems = [];
		this.entities = {};
		this.addSystem.apply(this, systems);
	}

	addSystem(...systems) {
		this.systems = this.systems.concat(systems.filter(system => system instanceof System));
	}

	addEntity(...entities) {
		entities.forEach(e => {
			if(e instanceof Entity) this.entities[e.id] = e;
		});
	}
}

module.exports = Scene;
