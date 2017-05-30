const fs = require("fs");
const gulp = require("gulp");
const webserver = require("gulp-webserver");
const sequence = require("run-sequence");
const browserify = require("browserify");
const watchify = require("watchify");

gulp.task("watch", function() {
	const b = browserify({
		entries: "src",
		cache: {},
		packageCache: {},
		plugin: [watchify]
	});

	const build = function() {
		b.bundle().pipe(fs.createWriteStream("build/build.js"));
	};

	b.on("update", build);
	build();
});

gulp.task("host", function() {
	gulp.src("./")
		.pipe(webserver());
});

gulp.task("dev", function() {
	sequence("watch", "host");
});
