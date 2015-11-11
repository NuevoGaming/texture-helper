var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del');

var PATHS = {
    src: {
        ts: 'src/**/*.ts'
    },
    target: 'dist',
    typings: {
        angular2: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
        router: 'node_modules/angular2/bundles/typings/angular2/router.d.ts',
        http: 'node_modules/angular2/bundles/typings/angular2/http.d.ts'
    }
};

gulp.task('clean', function(next) {
    del([PATHS.target]).then(function() {
        next();
    });
});

gulp.task('build', ['clean'], function() {
    var tsResult = gulp.src([
        PATHS.src.ts,
        PATHS.typings.angular2,
        PATHS.typings.router,
        PATHS.typings.http
    ])
    .pipe(ts({
        noImplicitAny: true,
        module: 'commonjs',
        target: 'ES5',
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    }));

    return tsResult.js.pipe(gulp.dest(PATHS.target));
});

gulp.task('default', ['build'], function() {
});