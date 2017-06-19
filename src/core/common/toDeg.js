function toDeg(rad) {
	rad = parseFloat(rad % 360) || 0;
	return rad * 180 / Math.PI;
}

module.exports = toDeg;
