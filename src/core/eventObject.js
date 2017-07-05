/**
 *	
 */

class EventObject {
	constructor() {
		Object.defineProperty(this, "events", {value: new Map});
	}

	listen(event, ...callbacks) {
		if(typeof event === "string") {

			callbacks = callbacks.filter(callback => typeof callback === "function")

			if(callbacks.length) {
				if(!this.events.has(event)) {
					this.events.set(event, new Set);
				}

				const handlers = this.events.get(event);
				callbacks.forEach(callback => handlers.add(callback));
			}
		}

		return this;
	}

	deafen(event, ...callbacks) {
		if(!event) {
			this.events.clear();
		}
		else if(this.events.has(event)) {
			if(!callback.length) {
				this.events.delete(event);
			}
			else {
				const handlers = this.events.get(event);

				for(const callback of callbacks) {
					handlers.delete(callback);
				}
			}
		}

		return this;
	}

	trigger(event, ...args) {
		const handlers = this.events.get(event);

		if(handlers) {
			handlers.forEach(e => e.apply(this, args));
		}

		return this;
	}
}

module.exports = EventObject;
