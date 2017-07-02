const random = {
	seed: 0,

	float(min, max) {
		min = Number(min) || 0;
		max = Number(max) || 1;
		this.seed = (this.seed * 9301 + 49297) % 233280;

		return (this.seed / 233280) * (max - min) + min;
	},

	int(min, max) {
		min = Number(min) || 0;
		max = Number(max) || 1;
		this.seed = (this.seed * 9301 + 49297) % 233280;

		return Math.floor((this.seed / 233280) * (max - min + 1)) + min;
	}
}

module.exports = random;
