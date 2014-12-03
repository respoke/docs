'use strict';

require('colors');
var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpsmith = require('gulpsmith');
var _ = require('lodash');
var through = require('through2');
var lazypipe = require('lazypipe');
var del = require('del');
var notifier = require('node-notifier');
var async = require('async');
var respokeStyle = require('respoke-style');

var renderJade = require('./lib/metalsmith/render-jade');
var insertExamples = require('./lib/metalsmith/insert-examples');

var argv = require('yargs')
    .default({
        dist: false,
        host: '127.0.0.1',
        port: '2002'
    })
    .alias({
        d: 'dist',
        h: 'host',
        p: 'port'
    })
    .argv;

var paths = {
    templates: path.join(__dirname, '/templates'),
    examples: path.join(__dirname, '/examples'),
    output: path.join(__dirname, '/build'),
    source: path.join(__dirname, '/src'),
    scripts: path.join(__dirname, '/src/js'),
    sass: path.join(__dirname, '/src/scss'),
    root: __dirname
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

function buildSite(callback) {
    var filterMarkdown = $.filter('**/*.md');
    var distPipe = lazypipe()
        .pipe(function buildDistPipe() {
            return $.if('*.html', $.minifyHtml());
        });

    gulp.src([
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
            .pipe(gulpsmith()
                .use(renderJade(paths, argv.dist))
                .use(insertExamples(paths, argv.dist))
            )
        .pipe(filterMarkdown.restore())
        .pipe($.if(argv.dist, distPipe()))
        .pipe(gulp.dest(paths.output))
        .on('end', function buildSiteCallback() {
            callback();
        });
}

function buildSass(callback) {
    var cssOutput = path.join(paths.output, 'css');

    gulp.src(path.join(paths.sass, '**/*'))
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                includePaths: [respokeStyle.paths.styles],
                errLogToConsole: true
            }))
            .pipe($.if(argv.dist, $.minifyCss()))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(cssOutput))
        .on('end', function buildSassCallback() {
            callback();
        });
}

function buildScripts(callback) {
    var scriptsOutput = paths.output + '/js';

    gulp.src(paths.scripts + '/**/*.js')
        .pipe($.sourcemaps.init())
            .pipe($.if(argv.dist, $.uglify()))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(scriptsOutput))
        .on('end', function buildScriptsCallback() {
            callback();
        });
}

function copySharedAssets(callback) {
    gulp.src(path.join(respokeStyle.paths.assets, '**/*'))
    .pipe(gulp.dest(paths.output))
    .on('end', function copyAssetsCallback() {
        callback();
    });
}

gulp.task('build', ['clean'], function buildTask(done) {
    async.parallel([
        buildSite,
        buildSass,
        buildScripts,
        copySharedAssets
    ], done);
});

gulp.task('build:site', function (done) {
    buildSite(done);
});

gulp.task('build:assets', [
    'build:assets:scripts',
    'build:assets:sass',
    'build:assets:respoke-style'
]);

gulp.task('build:assets:sass', function (done) {
    buildSass(done);
});

gulp.task('build:assets:scripts', function (done) {
    buildScripts(done);
});

gulp.task('build:assets:respoke-style', function (done) {
    copySharedAssets(done);
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
            '!' + paths.source + '/{scss/**,js/**}',
            path.join(respokeStyle.paths.templates, '**/*'),
            path.join(respokeStyle.paths.assets, '**/*')
        ],
        options,
        function siteWatch(files, cb) {
            watcherNotify('Starting build:site');
            gulp.start('build:site', function siteBuildCallback() {
                watcherNotify('Finished build:site');
                watcherNotify('Starting build:assets:respoke-style');
                gulp.start('build:assets:respoke-style', function syncSharedAssetsCallback() {
                    watcherNotify('Finished build:assets:respoke-style');
                    cb();
                });
            });
        });

    $.watch(
        [
            paths.sass + '/**/*',
            path.join(respokeStyle.paths.styles, '**/*')
        ],
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

gulp.task('example-runner', function (done) {
    var exampleRunner = require('./lib/example-runner')(paths);

    exampleRunner.run(function runnerFinished(error) {
        if (error) {
            console.log(error.toString().red);
        }
        done();
    });
});
