const random = {
	seed: 0,

	float(min, max) {
		min = parseFloat(min) || 0;
		max = parseFloat(max) || 1;
		this.seed = (this.seed * 9301 + 49297) % 233280;

		return min + (this.seed / 233280) * (max - min);
	},

	int(min, max) {
		return Math.floor(this.float(min, max))
	}
}

module.exports = random;
