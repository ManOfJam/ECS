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
	constructor() {
	}
}

module.exports = Component;

},{}],3:[function(require,module,exports){
const components = {
	Transform: require("./transform.js")
};

module.exports = components;

},{"./transform.js":4}],4:[function(require,module,exports){
const Component = require("../component.js");

class Transform extends Component {
	constructor() {
		super();
	}
}

module.exports = Transform;

},{"../component.js":2}],5:[function(require,module,exports){
const EventObject = require("./eventObject.js");

class Entity extends EventObject {
	constructor() {
		super();

		this.id = "#" + Math.random().toString(16).substring(2, 10);
	}
}

module.exports = Entity;

},{"./eventObject.js":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./entity.js":5,"./eventObject.js":6,"./system.js":9}],8:[function(require,module,exports){
const Scene = require("./scene.js");

class Stage extends Scene {
	constructor(...systems) {
		super();

		this.scenes = [];
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

			tick: (delta) => {
				this.systems.forEach(system => system.update(delta));
			}
		};

		this.addSystem.apply(this, systems);
	}

	start() {
		this.ticker.start();
	}
}

module.exports = Stage;

},{"./scene.js":7}],9:[function(require,module,exports){
class System {
	constructor() {
	}

	update(delta) {
	}
}

module.exports = System;

},{}],10:[function(require,module,exports){
const systems = {
	Render: require("./render.js")
};

module.exports = systems;

},{"./render.js":11}],11:[function(require,module,exports){
const extend = require("../common/extend.js");
const System = require("../system.js");

class Render extends System {
	constructor(canvas, options) {
		super();

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
	}
}

module.exports = Render;

},{"../common/extend.js":1,"../system.js":9}],12:[function(require,module,exports){
window.engine = {
	Entity: require("./entity.js"),
	Scene: require("./scene.js"),
	Stage: require("./stage.js"),
	System: require("./system.js"),
	components: require("./components"),
	systems: require("./systems")
};

},{"./components":3,"./entity.js":5,"./scene.js":7,"./stage.js":8,"./system.js":9,"./systems":10}]},{},[12]);
