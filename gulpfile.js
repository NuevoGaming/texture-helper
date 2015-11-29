var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    del = require('del'),
    less = require('gulp-less'),
    jade = require('gulp-jade');

var PATHS = {
    src: {
        ts: 'src/**/*.ts',
        welcome_less: 'src/static/styles/welcome.less',
        jade: 'src/static/**/*.jade',
        fonts: 'src/static/fonts/**/*',
        images: 'src/static/images/**/*'
    },
    target: {
        common: 'dist',
        css: 'dist/static/styles',
        html: 'dist/static',
        fonts: 'dist/static/fonts',
        images: 'dist/static/images'
    },
    typings: {
        angular2: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
        router: 'node_modules/angular2/bundles/typings/angular2/router.d.ts',
        http: 'node_modules/angular2/bundles/typings/angular2/http.d.ts'
    }
};

gulp.task('clean', function(next) {
    del([PATHS.target.common]).then(function() {
        next();
    });
});

gulp.task('build-js', function() {
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

    return tsResult.js.pipe(gulp.dest(PATHS.target.common));
});

gulp.task('build-css', function() {
    return gulp.src([
            PATHS.src.welcome_less
        ])
        .pipe(less())
        .pipe(gulp.dest(PATHS.target.css));
});

gulp.task('build-html', function() {
    return gulp.src([
            PATHS.src.jade
        ])
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest(PATHS.target.html));
});

gulp.task('mv-fonts', function() {
  return gulp.src(PATHS.src.fonts)
    .pipe(gulp.dest(PATHS.target.fonts));;
});

gulp.task('mv-images', function() {
  return gulp.src(PATHS.src.images)
    .pipe(gulp.dest(PATHS.target.images));;
});

gulp.task('default', ['clean'], function() {
  gulp.run('build-js', 'build-css', 'build-html', 'mv-fonts', 'mv-images');
});
