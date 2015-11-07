var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del');

var paths = {
    browserScripts: ['src/browser/*.ts']
};

gulp.task('browser.clean', function() {
    return del(['src/**/*.js']);
});

gulp.task('default', ['browser.clean'], function() {
    return gulp.src(paths.browserScripts)
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('src/browser'));
});