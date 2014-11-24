'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpsmith = require('gulpsmith');
var _ = require('lodash');
var through = require('through2');
var lazypipe = require('lazypipe');
var path = require('path');
var renderJade = require('./lib/metalsmith/render-jade');

var argv = require('yargs')
  .default({
    dist: false,
    host: 'pho3nixf1re.localtest.me',
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

gulp.task('build', ['clean'], function buildTask() {
    gulp.start('build:site');
});

gulp.task('build:site', ['build:assets'], function smithTask() {
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
            .pipe(gulpsmith().use(renderJade(paths.templates, dist)))
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

gulp.task('clean', function cleanupTask() {
    return gulp.src(paths.output, { read: false })
        .pipe($.clean());
});

gulp.task('publish', function publishTask() {
    argv.dist = true;
    return gulp.src(paths.output + '/**/*')
        .pipe($.ghPages())
        .on('end', function publishTaskFinished() {
            gulp.start('clean');
        });
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
