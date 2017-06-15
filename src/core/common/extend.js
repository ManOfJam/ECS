function extend(target, ...sources) {
	if(!(target instanceof Object))
		throw new TypeError("extend() target argument must be instance of Object");

	for(const source of sources) {
		for(const key in source) {
			if(source[key] && source[key] instanceof Object) {
				if(source[key] && source[key] instanceof Object) {
					extend(target[key], source[key]);
				}
				else {
					target[key] = extend({}, source[key])
				}
			}
			else {
				target[key] = source[key];
			}
		}
	}

	return target;
}

module.exports = extend;
