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
	if(!fs.existsSync("demo")) {
		fs.mkdirSync("demo");
	}

	if(!fs.existsSync("demo/index.html")) {
		fs.writeFile("demo/index.html", "<!DOCTYPE html><html lang=\"en-gb\"><head><meta charset=\"UTF-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>ECS | Demo</title></head><body><canvas id=\"demo\" style=\"border: 1px solid #000; display: block; margin: 72px auto 0;\"></canvas><script src=\"/build/build.js\"></script><script src=\"demo.js\"></script></body></html>");
	}

	if(!fs.existsSync("demo/demo.js")) {
		fs.writeFile("demo/demo.js", "");
	}

	sequence("watch", "host");
});
