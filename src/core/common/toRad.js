function toRad(deg) {
	deg = parseFloat(deg % 360) || 0;
	return deg * Math.PI / 180;
}

module.exports = toRad;
