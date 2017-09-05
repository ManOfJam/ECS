const browserify = require("browserify");
const fs = require("fs");
const gulp = require("gulp");
const stream = require("vinyl-source-stream");
const webserver = require("gulp-webserver");

gulp.task("build", () => {
	browserify("src")
		.bundle().on("error", function(err) {
			console.log(err.message);
			this.emit("end");
		})
		.pipe(stream("build.js"))
		.pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
	gulp.watch("src/**/*.js", ["build"]);
});

gulp.task("serve", () => {
	if(!fs.existsSync("demo")) {
		fs.mkdirSync("demo");
	}

	if(!fs.existsSync("demo/index.html")) {
		fs.writeFile("demo/index.html", "<!DOCTYPE html><html lang=\"en-gb\"><head><meta charset=\"UTF-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>ECS | Demo</title></head><body><canvas id=\"demo\" style=\"border: 1px solid #000; display: block; margin: 72px auto 0;\"></canvas><script src=\"/dist/build.js\"></script><script src=\"demo.js\"></script></body></html>\n");
	}

	if(!fs.existsSync("demo/demo.js")) {
		fs.writeFile("demo/demo.js", "");
	}

	gulp.src(".")
		.pipe(webserver({
			open: "demo"
		}));
});

gulp.task("dev", ["build", "watch", "serve"]);
