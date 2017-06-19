function clamp (num, min, max) {
	return Math.min(max, Math.max(min, num));
}

module.exports = clamp;
