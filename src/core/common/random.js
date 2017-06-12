const random = {
	seed: 0,

	float(min, max) {
		min = parseFloat(min) || 0;
		max = parseFloat(max) || 1;
		this.seed = (this.seed * 9301 + 49297) % 233280;

		return (this.seed / 233280) * (max - min) + min;
	},

	int(min, max) {
		min = parseInt(min) || 0;
		max = parseInt(max) || 1;
		this.seed = (this.seed * 9301 + 49297) % 233280;

		return Math.floor((this.seed / 233280) * (max - min + 1)) + min;
	}
}

module.exports = random;
