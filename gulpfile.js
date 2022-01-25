var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");

// Task which would delete the old build directory if present
gulp.task("build-clean", function () {
    return del(["./build"]);
});

// Task which would transpile typescript to javascript
gulp.task("transpile-typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
});

// Task which would just create a copy of the current views directory in build directory
gulp.task("copy-views", function () {
    return gulp.src("./src/views/**/*.ejs").pipe(gulp.dest("./build/views"));
});

// Task which would just create a copy of the current static assets directory in build directory
gulp.task("copy-assets", function () {
    return gulp.src("./src/public/**/*").pipe(gulp.dest("./build/public"));
});

// Task which would just create a copy of the current config files in build directory
gulp.task("copy-config", function () {
    return gulp.src("./src/config/environments/*.json").pipe(gulp.dest("./build/config/environments"));
});

// Task which combines the three copy tasks into one
gulp.task('copy-resources', gulp.series('copy-views', 'copy-assets', 'copy-config'));

// The default task which runs at start of the gulpfile.js
gulp.task("default", gulp.series("build-clean", "transpile-typescript", "copy-resources"), () => {
    console.log("Done");
});