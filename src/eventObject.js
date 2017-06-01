class EventObject {
	constructor() {
		this.events = {};
	}

	on(events, callbacks) {

		events = (Array.isArray(events) ? events : [events])
			.filter(event => typeof event === "string");

		callbacks = (Array.isArray(callbacks) ? callbacks : [callbacks])
			.filter(callback => typeof callback === "function");

		if(events.length && callbacks.length) {
			for(const event of events) {
				this.events[event] = (this.events[event] || (this.events[event] = [])).concat(callbacks);
			}
		}
	}

	off(events, callbacks) {

		events = (Array.isArray(events) ? events : [events])
			.filter(event => typeof event === "string");

		callbacks = (Array.isArray(callbacks) ? callbacks : [callbacks])
			.filter(callback => typeof callback === "function" || typeof callbackIndex);

		if(events.length && callbacks.length) {
			for(const event of events) {
				for(const callback of callbacks) {
					const callbackIndex = eventsList.findIndex(curCallback => curCallback === callback || curCallback.name === callback);

					if(callbackIndex !== -1) {
						this.events[e].splice(callbackIndex, 1);
						if(!this.events[e].length) delete this.events[e][event];
					}
				}
			}
		}
	}

	trigger() {
	}
}

module.exports = EventObject;
