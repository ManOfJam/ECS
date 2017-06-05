const fs = require("fs");
const gulp = require("gulp");
const webserver = require("gulp-webserver");
const sequence = require("run-sequence");
const browserify = require("browserify");
const watchify = require("watchify");

const b = browserify({
	debug: true,
	entries: "src",
	cache: {},
	packageCache: {},
	plugin: [watchify]
});

const build = function() {
	if(!fs.existsSync("build"))
		fs.mkdirSync("build");

	b.bundle().pipe(fs.createWriteStream("build/build.js"));
};

gulp.task("build", build);

gulp.task("watch", function() {
	b.on("update", build);
	build();
});

gulp.task("host", function() {
	gulp.src("./").pipe(webserver());
});

gulp.task("dev", function() {
	sequence("watch", "host");
});
