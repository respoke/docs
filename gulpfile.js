var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
    var options = {};
    return gulp
        .src('./build/**/*')
        .pipe(deploy(options));
});
