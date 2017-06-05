const System = require("../system.js");

class Motion extends System {
	constructor() {
		super("transform", "motion");
	}

	update(entityPool, delta) {
		const entities = this.getEntities.apply(this, entityPool);
		
		for(const entity of entities) {
			entity.transform.translate(entity.motion);
			entity.trigger("update");
		}
	}
}

module.exports = Motion;
