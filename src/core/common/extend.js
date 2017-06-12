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
