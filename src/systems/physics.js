const Entity = require("../entity");
const System = require("../system");
const Vector = require("../geometry/vector");

class Physics extends System {
	constructor() {
		super("shape", "physics");
	}

	update(...entities) {
		for(const entity of entities) {
			const shape = entity.getComponent("shape");
			const physics = entity.getComponent("physics");

			switch(shape.constructor.name) {
				case "Rectangle": {
					shape.position.translate(physics.velocity);
					break;
				}

				case "Circle": {
					break;
				}
			}
		}
	}
}

module.exports = Physics;
