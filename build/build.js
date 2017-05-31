(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function extend(target, sources, options) {
	if(!target || !sources)
		return;

	if(!Array.isArray(sources))
		sources = [sources];

	const settings = {
		overwrite: true,
		deep: true
	};

	extend(settings, options);

	for(let source of sources) {
		for(let key in source) {
			if(settings.deep && source[key] && source[key].constructor === Object) {
				if(source[key] && source[key].constructor === Object) {
					extend(target[key], source[key]);
				}
				else if(!key in target || settings.overwrite) {
					target[key] = extend({}, source[key])
				}
			}
			else if(!key in target || settings.overwrite) {
				target[key] = source[key];
			}
		}
	}

	return target;
}

module.exports = extend;

},{}],2:[function(require,module,exports){
class Component {
	constructor(name) {
		this.name = name;
	}
}

module.exports = Component;

},{}],3:[function(require,module,exports){
const Component = require("../component.js");
const Shape = require("../geometry/shape.js");

class Body extends Component {
	constructor(shape) {
		super("body");

		if(!(shape instanceof Shape))
			return;

		this.shape = shape;
	}
}

module.exports = Body;

},{"../component.js":2,"../geometry/shape.js":9}],4:[function(require,module,exports){
const components = {
	Body: require("./body.js"),
	Transform: require("./transform.js")
};

module.exports = components;

},{"./body.js":3,"./transform.js":5}],5:[function(require,module,exports){
const Component = require("../component.js");
const Vector = require("../geometry/vector.js");

class Transform extends Component {
	constructor(x, y, deg) {
		super("transform");

		if(typeof x === "object") {
			if(Array.isArray(x)) {
				deg = y;
				y = x[0];
				x = x[1];
			}
			else if(x) {
				deg = y;
				y = x.y;
				x = x.x;
			}
		}

		this.position = new Vector(x, y);
		this.angle = (parseInt(deg) || 0) % 360;
	}

	translate(x, y) {
		this.position = this.position.add(new Vector(x, y));
	}

	rotate(deg) {
		this.angle = (this.angle + deg) % 360;
	}
}

module.exports = Transform;

},{"../component.js":2,"../geometry/vector.js":10}],6:[function(require,module,exports){
const EventObject = require("./eventObject.js");
const Component = require("./component.js");

class Entity extends EventObject {
	constructor(...components) {
		super();

		this.id = "#" + Math.random().toString(16).substring(2, 10);
		this.addComponent.apply(this, components);
	}

	addComponent(...components) {
		components.forEach(c => {
			if(c instanceof Component) this[c.name] = c;
		});
	}
}

module.exports = Entity;

},{"./component.js":2,"./eventObject.js":7}],7:[function(require,module,exports){
class EventObject {
	constructor() {
		this.events = {};
	}

	on(events, callbacks) {
		events = (Array.isArray(events) ? events : [events]).filter(event => typeof event === "string");
		callbacks = (Array.isArray(callbacks) ? callbacks : [callbacks]).filter(callback => typeof callback === "function");

		if(events.length && callbacks.length)
			for(let event of events)
				this.events[event] = (this.events[event] || (this.events[event] = [])).concat(callbacks);
	}

	off(events, callbacks) {
	}

	trigger() {
	}
}

module.exports = EventObject;

},{}],8:[function(require,module,exports){
const geometry = {
	Shape: require("./shape.js"),
	Vector: require("./vector.js")
};

module.exports = geometry;

},{"./shape.js":9,"./vector.js":10}],9:[function(require,module,exports){
class Shape {
	constructor() {
	}
}

module.exports = Shape;

},{}],10:[function(require,module,exports){
class Vector {
	constructor(x, y) {

		if(typeof x === "object") {
			if(Array.isArray(x)) {
				y = x[1];
				x = x[0];
				
			}
			else if(x) {
				y = x["y"];
				x = x["x"];
			}
		}

		this.x = (parseInt(x) || 0);
		this.y = (parseInt(y) || 0);
	}

	add(x, y) {
		const addend = new Vector(x, y);
		return new Vector(this.x + addend.x, this.y + addend.y);
	}
}

module.exports = Vector;

},{}],11:[function(require,module,exports){
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

},{"./entity.js":6,"./eventObject.js":7}],12:[function(require,module,exports){
const EventObject = require("./eventObject.js");
const System = require("./system.js");
const Scene = require("./scene.js");

class Stage extends EventObject {
	constructor(...systems) {
		super();

		this.systems = [];
		this.addSystem.apply(this, systems);
		this.scenes = {};
		this.addScene(new Scene("main"));
		this.currentName = "main";
		this.ticker = {
			interval: 1000,
			running: false,
			frameId: null,

			start() {
				if(this.running) return;

				let then = performance.now();
				const frame = () => {
					this.frameId = requestAnimationFrame(frame);

					const now = performance.now();
					const elapsed = now - then;
					const delta = Math.floor(elapsed / this.interval);

					if(delta) {
						this.tick(delta);
						then = now;
					}
				};

				this.frameId = requestAnimationFrame(frame);
				this.running = true;
			},

			stop() {
				if(!this.running) return;

				cancelAnimationFrame(this.frameId);
				this.running = false;
			},

			tick: (delta) => this.update(delta)
		};
	}

	get currentScene() {
		return this.scenes[this.currentName];
	}

	addSystem(...systems) {
		this.systems = this.systems.concat(systems.filter(system => system instanceof System));
	}

	addEntity(...entities) {
		this.currentScene.addEntity.apply(this.currentScene, entities);
	}

	addScene(...scenes) {
		scenes.forEach(s => {
			if(s instanceof Scene) this.scenes[s.name] = s;
		});
	}

	update(delta) {
		this.systems.forEach(system => {
			if(typeof system.update === "function") {
				system.update(this.currentScene.entities, delta);
			}
		});
	}

	start() {
		this.ticker.start();
	}

	stop() {
		this.ticker.stop();
	}
}

module.exports = Stage;

},{"./eventObject.js":7,"./scene.js":11,"./system.js":13}],13:[function(require,module,exports){
const Entity = require("./entity.js");

class System {
	constructor(...required) {
		this.required = required.filter(r => typeof r === "string");
	}

	getEntities(...entities) {
		return entities.filter(e => e instanceof Entity && this.required.every(r => r in e));
	}
}

module.exports = System;

},{"./entity.js":6}],14:[function(require,module,exports){
const systems = {
	Render: require("./render.js")
};

module.exports = systems;

},{"./render.js":15}],15:[function(require,module,exports){
const extend = require("../common/extend.js");
const System = require("../system.js");

class Render extends System {
	constructor(canvas, options) {
		super("transform", "body");

		if(typeof canvas === "string")
			canvas = document.getElementById(canvas);

		if(!(canvas instanceof HTMLCanvasElement))
			return;

		const settings = {
			width: 720,
			height: 720
		};

		extend(settings, options);

		canvas.setAttribute("width", settings.width);
		canvas.setAttribute("height", settings.height);

		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	}

	update(entityPool, delta) {
		const entities = this.getEntities(entityPool);
	}
}

module.exports = Render;

},{"../common/extend.js":1,"../system.js":13}],16:[function(require,module,exports){
window.engine = {
	Entity: require("./entity.js"),
	Scene: require("./scene.js"),
	Stage: require("./stage.js"),
	System: require("./system.js"),
	components: require("./components"),
	geometry: require("./geometry"),
	systems: require("./systems")
};

},{"./components":4,"./entity.js":6,"./geometry":8,"./scene.js":11,"./stage.js":12,"./system.js":13,"./systems":14}]},{},[16]);
