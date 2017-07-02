function toRad(deg) {
	deg = Number(deg % 360) || 0;
	return deg * Math.PI / 180;
}

module.exports = toRad;
