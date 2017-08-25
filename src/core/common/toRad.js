function toRad(deg) {
	if(typeof deg !== "number") {
		return NaN;
	}

	return (deg % 360) * Math.PI / 180;
}

module.exports = toRad;
