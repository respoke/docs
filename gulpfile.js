'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpsmith = require('gulpsmith');
var _ = require('lodash');
var through = require('through2');
var path = require('path');
var renderJade = require('./lib/metalsmith/render-jade');

var paths = {
    templates: __dirname + '/templates/',
    output: __dirname + '/build',
    input: __dirname + '/src',
    sass: __dirname + '/src/scss'
};

var dist = false;

gulp.task('deploy', ['build'], function deployTask() {
    var options = {};
    return gulp
        .src('./build/**/*')
        .pipe($.deploy(options))
        .on('end', function cleanUpDeploy() {
            gulp.start('clean');
        });
});

gulp.task('build', ['clean', 'build:assets'], function smithieTask() {
    var filterMarkdown = $.filter('**/*.md');

    return gulp.src([ paths.input + '/**/*', '!' + paths.input + '/{scss,scss/**}'])
        .pipe(filterMarkdown)
            .pipe($.frontMatter({
                property: 'data',
                remove: true
            }))
            .pipe($.data(function sidebarSectionsData(file) {
                if (!file.data || !file.data.title) {
                    return {};
                }
                var relativePath = file.path.replace(file.base, '');
                var sections = relativePath.split(path.sep);
                var section = '';

                if (sections.length > 1) {
                    sections.pop();
                    section = sections.join('/');
                }

                return _.merge(file.data, { section: section });
            }))
            .pipe($.marked({
                gfm: true,
                smartypants: true,
                tables: true
            }))
            .pipe(gulpsmith().use(renderJade(paths.templates, dist)))
        .pipe(filterMarkdown.restore())
        .pipe(gulp.dest(paths.output));
});

gulp.task('build:assets', ['clean'], function assetsTask() {
    var cssOutput = paths.output + '/css';

    return gulp.src(paths.sass + '/**/*')
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('clean', function cleanupTask() {
    return gulp.src(paths.output, { read: false })
        .pipe($.clean());
});
