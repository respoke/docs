'use strict';

// gulp and plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    templates: __dirname + '/templates/',
    output: __dirname + '/build',
    input: __dirname + '/src',
    scss: __dirname + '/src/scss'
};

gulp.task('deploy', function () {
    var options = {};
    return gulp
        .src('./build/**/*')
        .pipe($.deploy(options));
});

gulp.task('build:assets', function assetsTask() {
    var cssOutput = paths.output + '/css';

    return gulp.src(paths.scss + '/**/*')
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('clean', function cleanupTask() {
  return gulp.src(paths.output, { read: false })
    .pipe($.rimraf());
});
