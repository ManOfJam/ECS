const Entity = require("../entity");
const System = require("../system");
const Vector = require("../geometry/vector");

class Motion extends System {
	constructor() {
		super("spatial", "motion");
	}

	update(entities, delta) {
		entities = entities.filter(
			e => e instanceof Entity && this.required.every(r => e.hasComponent(r))
		);

		for(const entity of entities) {
			const spatial = entity.getComponent("spatial");
			const motion = entity.getComponent("motion");

			spatial.translate(motion.movement);

			entity.trigger("update");
		}
	}
}

module.exports = Motion;
