const System = require("../core/system");

class Physics extends System {
	constructor() {
		super("physics", "body", "physics");
	}

	update(delta, ...entities) {
		for(const entity of entities) {
			const body = entity.getComponent("body");
			const physics = entity.getComponent("physics");

			if(physics.angularVelocity)
				body.rotate(physics.angularVelocity);
		}
	}
}

module.exports = Physics;
