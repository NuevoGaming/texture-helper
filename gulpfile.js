var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    less = require('gulp-less');

var PATHS = {
    src: {
        ts: 'src/**/*.ts',
        welcome_less: 'static/styles/welcome.less'
    },
    target: {
        js: 'dist'
    },
    typings: {
        angular2: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
        router: 'node_modules/angular2/bundles/typings/angular2/router.d.ts',
        http: 'node_modules/angular2/bundles/typings/angular2/http.d.ts'
    }
};

gulp.task('clean-js', function(next) {
    del([PATHS.target.js]).then(function() {
        next();
    });
});

gulp.task('clean-css', function(next) {
    del(['static/styles/*.css']).then(function() {
        next();
    });
});

gulp.task('build-js', ['clean-js'], function() {
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

    return tsResult.js.pipe(gulp.dest(PATHS.target.js));
});

gulp.task('build-css', ['clean-css'], function() {
    return gulp.src([
            PATHS.src.welcome_less
        ])
        .pipe(less())
        .pipe(gulp.dest('static/styles'));
});

gulp.task('default', ['build-js', 'build-css'], function() {
});