function toDeg(rad) {
	rad = Number(rad % 360) || 0;
	return rad * 180 / Math.PI;
}

module.exports = toDeg;
