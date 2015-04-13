/*global -$: true] */
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
var navigation = require('metalsmith-navigation');

var renderJade = require('./lib/metalsmith/render-jade');
var insertExamples = require('./lib/metalsmith/insert-examples');

var argv = require('yargs')
    .default({
        dist: false,
        host: '127.0.0.1',
        port: '2003'
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
    output: path.join(__dirname, '/public'),
    source: path.join(__dirname, '/src'),
    scripts: path.join(__dirname, '/js'),
    sass: path.join(__dirname, '/scss'),
    root: __dirname
};

var navConfig = {
    sidebar: {
        sortBy: 'menuOrder',
        sortByNameFirst: true,
        breadcrumbProperty: 'breadcrumbPath',
        filterProperty: 'showInMenu',
        filterValue: 'true',
        mergeMatchingFilesAndDirs: true
    }
};

// default values shown
var navSettings = {
    navListProperty: 'navs'
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

    gulp.src(paths.source + '/**/*')
        .pipe(filterMarkdown)
            .pipe($.frontMatter({
                property: 'data',
                remove: true
            }))
            .pipe(through.obj(function sidebarDataTransform(file, enc, callback) {
                if (!file.data) {
                    callback();
                }

                // copy nav metadata for metalsmith-navigation plugin
                file.showInMenu = file.data.showInMenu;
                file.menuOrder = file.data.menuOrder;
                callback(null, file);
            }))
            .pipe($.marked({
                gfm: true,
                tables: true
            }))
            .pipe(through.obj(function checkAndApplyAlternateExt(file, enc, callback) {
                if (file.data.extname) {
                    var currentExt = path.extname(file.path);
                    file.path = file.path.replace(currentExt, file.data.extname);
                }
                callback(null, file);
            }))
            .pipe(gulpsmith()
                .use(navigation(navConfig, navSettings))
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
        .pipe($.if(!argv.dist, $.sourcemaps.init()))
            .pipe($.sass({
                includePaths: respokeStyle.includeStylePaths(),
                errLogToConsole: true
            }))
            .pipe($.if(argv.dist, $.minifyCss()))
        .pipe($.if(!argv.dist, $.sourcemaps.write()))
        .pipe(gulp.dest(cssOutput))
        .on('end', function buildSassCallback() {
            callback();
        });
}

function buildScripts(callback) {
    var scriptsOutput = paths.output + '/js';

    gulp.src(paths.scripts + '/**/*.js')
        .pipe($.if(argv.dist, $.uglify()))
        .pipe(gulp.dest(scriptsOutput))
        .on('end', function buildScriptsCallback() {
            callback();
        });
}

function copySharedAssets(callback) {
    var filterJS = $.filter('**/*.js');
    var filterCSS = $.filter('**/*.css');

    gulp.src(path.join(respokeStyle.paths.assets, '**/*'))
        .pipe(filterJS)
            .pipe($.if(argv.dist, $.uglify()))
        .pipe(filterJS.restore())
        .pipe(filterCSS)
            .pipe($.if(argv.dist, $.minifyCss()))
        .pipe(filterCSS.restore())
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

    exampleRunner.run(function runnerFinished(error, runnersOutput) {
        if (error) {
            console.log(error.toString().red);
        }
        if (runnersOutput) {
            console.log(runnersOutput.join('\n').green);
        }
        done();
    });
});
