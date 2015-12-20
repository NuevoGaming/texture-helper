var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  ts = require('gulp-typescript'),
  del = require('del'),
  less = require('gulp-less'),
  jade = require('gulp-jade'),
  run = require('gulp-run');

var PATHS = {
  src: {
    ts: 'src/**/*.ts',
    welcome_less: 'src/front-end/public/styles/welcome.less',
    project_less: 'src/front-end/public/styles/project.less',
    jade: 'src/front-end/public/**/*.jade',
    fonts: 'src/front-end/public/fonts/**/*',
    images: 'src/front-end/public/images/**/*'
  },
  target: {
    common: 'dist',
    css: 'dist/front-end/public/styles',
    html: 'dist/front-end/public',
    fonts: 'dist/front-end/public/fonts',
    images: 'dist/front-end/public/images'
  },
  typings: {
    angular2: 'node_modules/angular2/angular2.d.ts',
    router: 'node_modules/angular2/router.d.ts',
    http: 'node_modules/angular2/http.d.ts'
  }
};

gulp.task('build:clean', function() {
  return del([PATHS.target.common]);
});

gulp.task('build:js', function() {
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

gulp.task('build:css', function() {
  return gulp.src([
      PATHS.src.welcome_less,
      PATHS.src.project_less
    ])
    .pipe(less())
    .pipe(gulp.dest(PATHS.target.css));
});

gulp.task('build:html', function() {
  return gulp.src([
      PATHS.src.jade
    ])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(PATHS.target.html));
});

gulp.task('build:mv:fonts', function() {
  return gulp.src(PATHS.src.fonts)
    .pipe(gulp.dest(PATHS.target.fonts));;
});

gulp.task('build:mv:images', function() {
  return gulp.src(PATHS.src.images)
    .pipe(gulp.dest(PATHS.target.images));;
});

gulp.task('build', ['build:clean'], function(callback) {
  runSequence(['build:js', 'build:css', 'build:html', 'build:mv:fonts', 'build:mv:images'], callback);
});

gulp.task('default', ['build']);

gulp.task('run', ['default'], function() {
  return run('electron .').exec();
});
