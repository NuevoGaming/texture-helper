var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del');

var paths = {
    scripts: ['src/**/*.ts'],
    target: 'dist'
};

gulp.task('clean', function(next) {
    del([paths.target]).then(function() {
        next();
    });
});

gulp.task('build', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(ts({
            noImplicitAny: true,
            removeComments: true,
            target: 'ES5'
        }))
        .pipe(gulp.dest(paths.target));
});

gulp.task('default', ['build'], function() {
});