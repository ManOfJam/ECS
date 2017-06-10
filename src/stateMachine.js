const EventObject = require("./eventObject");
const State = require("./state");

class StateMachine extends EventObject {
	constructor(initialState) {
		super();

		Object.defineProperties(this, {
			states: {value: new Map},
			current: {value: null, writable: true}
		});

		this.addState(initialState);
		this.enterState(initialState);
		this.trigger("new");
	}

	addState(...states) {
		for(const state of states) {
			if(state instanceof State) {
				this.states.set(state.name, state);
			}
		}

		this.trigger("addstate");
		return this;
	}

	removeState(...states) {
		for(const state of states)
			this.states.delete(state instanceof State ? state.name : state);

		this.trigger("removestate");
		return this;
	}

	hasState(...states) {
		for(const state of states) {
			if(!this.states.has(state instanceof State ? state.name : state)) {
				return false;
			}
		}

		return true;
	}

	getState(state) {
		return this.states.get(state instanceof State ? state.name : state);
	}

	enterState(state) {
		const next = this.getState(state);

		if(next) {
			if(this.current)
				this.current.trigger("exit");
			
			this.current = next;
			next.trigger("enter");
		}

		return this;
	}
}

module.exports = StateMachine;
