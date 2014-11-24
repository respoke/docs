'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpsmith = require('gulpsmith');
var _ = require('lodash');
var through = require('through2');
var lazypipe = require('lazypipe');
var path = require('path');
var del = require('del');
var notifier = require('node-notifier');

var renderJade = require('./lib/metalsmith/render-jade');

var argv = require('yargs')
  .default({
    dist: false,
    host: 'docs-respoke.localtest.me',
    port: '8000'
  })
  .alias({
    d: 'dist',
    h: 'host',
    p: 'port'
  })
  .argv;

var paths = {
    templates: __dirname + '/templates/',
    output: __dirname + '/build',
    source: __dirname + '/src',
    scripts: __dirname + '/src/js',
    sass: __dirname + '/src/scss'
};

function cleanBuildDir(done) {
    del(paths.output, done);
}

gulp.task('default', ['serve']);

gulp.task('deploy', ['build'], function deployTask(done) {
    var options = {};
    gulp.src(paths.output + '/**/*')
        .pipe($.ghPages(options))
        .on('end', function cleanUpDeploy() {
            cleanBuildDir(done);
        });
});

gulp.task('build', ['clean'], function buildTask() {
    gulp.start(['build:site', 'build:assets']);
});

gulp.task('build:site', function smithTask() {
    var filterMarkdown = $.filter('**/*.md');
    var distPipe = lazypipe()
        .pipe(function buildDistPipe() {
            return $.if('*.html', $.minifyHtml());
        });

    return gulp.src([
        paths.source + '/**/*',
        '!' + paths.source + '/{scss,scss/**}',
        '!' + paths.source + '/{js,js/**}'
    ])
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
            .pipe(gulpsmith().use(renderJade(paths.templates, argv.dist)))
        .pipe(filterMarkdown.restore())
        .pipe($.if(argv.dist, distPipe()))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build:assets', ['build:assets:sass', 'build:assets:scripts']);

gulp.task('build:assets:sass', function assetsSassTask() {
    var cssOutput = paths.output + '/css';

    return gulp.src(paths.sass + '/**/*')
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
            .pipe($.if(argv.dist, $.minifyCss()))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(cssOutput));
});

gulp.task('build:assets:scripts', function assetsScriptsTask() {
    var scriptsOutput = paths.output + '/js';

    return gulp.src(paths.scripts + '/**/*.js')
        .pipe($.sourcemaps.init())
            .pipe($.if(argv.dist, $.uglify()))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(scriptsOutput));
});

gulp.task('clean', function cleanupTask(done) {
    cleanBuildDir(done);
});

gulp.task('lint', function lintTask() {
    return gulp.src([
        __dirname + 'lib/**/*.js',
        paths.source + '/**/*.js',
        __filename
    ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jscs());
});

gulp.task('webserver', function webserverTask() {
    return gulp.src(paths.output)
        .pipe($.webserver({
            host: argv.host,
            port: argv.port,
            livereload: true
        }));
});

gulp.task('serve', ['build', 'watch', 'webserver']);

gulp.task('watch', function watchTask(done) {
    var options = {
        emitOnGlob: false
    };
    var watcherNotify = function watcherNotify(message) {
        notifier.notify({
            title: 'Gulp watcher',
            message: message
        });
    };

    $.watch(
        [
            paths.templates + '/**/*',
            paths.source + '/**/*',
            '!' + paths.source + '/{scss/**,js/**}'
        ],
        options,
        function siteWatch(files, cb) {
            watcherNotify('Starting build:site');
            gulp.start('build:site', function siteBuildCallback() {
                watcherNotify('Finished build:site');
                cb();
            });
        });

    $.watch(
        paths.sass + '/**/*',
        options,
        function sassWatch(files, cb) {
            watcherNotify('Starting build:assets:sass');
            gulp.start('build:assets:sass', function sassBuildCallback() {
                watcherNotify('Finished build:assets:sass');
                cb();
            });
        });

    $.watch(
        paths.scripts + '/**/*', options,
        function scriptsWatch(files, cb) {
            watcherNotify('Starting build:assets:scripts');
            gulp.start('build:assets:scripts', function scriptsBuildCallback() {
                watcherNotify('Finished build:assets:scripts');
                cb();
            });
        });

    done();
});
