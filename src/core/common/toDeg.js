function toDeg(rad) {
	if(typeof rad !== "number") {
		return NaN;
	}

	return (rad % 360) * 180 / Math.PI;
}

module.exports = toDeg;
