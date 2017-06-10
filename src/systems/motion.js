const Entity = require("../entity");
const System = require("../system");
const Vector = require("../geometry/vector");

class Motion extends System {
	constructor() {
		super("motion", "spatial", "motion");
	}

	update(...entities) {
		for(const entity of entities) {
			const spatial = entity.getComponent("spatial");
			const motion = entity.getComponent("motion");

			spatial.translate(motion.movement);
		}
	}
}

module.exports = Motion;
