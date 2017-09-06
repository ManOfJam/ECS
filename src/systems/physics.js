const System = require("../core/system");

class Physics extends System {
	constructor() {
		super("physics", ["body", "physics"]);
	}

	update(entities, delta) {
		for(const entity of entities) {
			const body = entity.getComponent("body");
			const physics = entity.getComponent("physics");

			if(physics.angularVelocity);
				body.rotate(physics.angularVelocity, body.center);

			if(physics.velocity.length)
				body.translate(physics.velocity);
		}

		this.trigger("update");

		return this;
	}
}

module.exports = Physics;
