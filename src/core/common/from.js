/**
 * Creates a new object with the properties and values of the given objects. Object references are deeply cloned, and when
 * both the target and source object contain an object reference at that property, the two are merged. Objects given later
 * in the order of arguments will overwrite those given earlier.
 *
 * @param {...Object} objects - The objects from which the properties and values will be copied.
 * @return {Object} New object created from the given objects.
 */

function from(...objects) {
	const target = {};

	for(const object of objects) {
		for(const key in object) {
			if(object[key] && typeof object[key] === "object") {
				if(target[key] && typeof target[key] === "object") {
					target[key] = from(target[key], object[key]);
				}
				else {
					target[key] = from(object[key]);
				}
			}
			else {
				target[key] = object[key];
			}
		}
	}

	return target;
}

module.exports = from;
