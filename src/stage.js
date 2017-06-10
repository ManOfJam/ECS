const StateMachine = require("./stateMachine");
const System = require("./system");
const Scene = require("./scene");
const Ticker = require("./ticker");
const extend = require("./common/extend");

class Stage extends StateMachine {
	constructor(...systems) {
		super(new Scene("main"));

		Object.defineProperties(this, {
			systems: {value: new Map},
			ticker: {value: new Ticker}
		});

		const options = (!(systems[0] instanceof System)) ? systems[0] : {};
		const settings = {
			width: 720,
			height: 720
		};

		extend(this, settings, options);

		this.addSystem.apply(this, systems);
	}

	addEntity(...entities) {
		this.current.addEntity.apply(this.current, entities);

		return this;
	}

	removeEntiy(...entities) {
		this.current.removeEntity.apply(this.current, entities);

		return this;
	}

	hasEntity(...entities) {
		return this.current.hasEntity.apply(this.current, entities);
	}

	getEntity(entity) {
		return this.current.getEntity(entity);
	}

	getEntities() {
		return Array.from(this.current.entities).map(entry => entry[1]);
	}

	addScene(...scenes) {
		this.addState.apply(this, scenes);

		return this;
	}

	removeScene(...scenes) {
		this.removeScene.apply(this, scenes);

		return this;
	}

	hasScene(...scenes) {
		return this.hasState.apply(this, scenes);
	}

	getScene(scene) {
		return this.getState(scene);
	}

	enterScene(scene) {
		this.enterState(scene);

		return this;
	}

	addSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System) {
				this.systems.set(system.name, system);
			}
		}

		return this;
	}

	removeSystem(...systems) {
		for(const system of systems)
			this.systems.delete(system instanceof System ? system.name : system);

		return this;
	}

	hasSystem(...systems) {
		for(const system of systems) {
			if(!this.systems.has(system instanceof System ? system.name : system)) {
				return false;
			}
		}

		return true;
	}

	getSystem(system) {
		return this.systems.get(system instanceof System ? system.name : system);
	}

	start() {
		this.ticker.start(this.update.bind(this));
	}

	stop() {
		this.ticker.stop();
	}

	update() {
		for(const [name, system] of this.systems) {
			if(typeof system.update !== "function")
				continue;

			const entities = this.getEntities().filter(
				entity => entity.hasComponent.apply(entity, system.required)
			);

			system.update.apply(system, entities);
		}

		this.trigger("update");
	}
}

module.exports = Stage;
