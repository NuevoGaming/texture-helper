const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const less = require('gulp-less');
const jade = require('gulp-jade');
const run = require('gulp-run');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const gutil = require('gulp-util');

const PATHS = {
  src: {
    welcome_less: 'src/front-end/public/styles/welcome.less',
    project_less: 'src/front-end/public/styles/project.less',
    jade: 'src/front-end/public/**/*.jade',
    fonts: 'src/front-end/public/fonts/**/*',
    images: 'src/front-end/public/images/**/*'
  },
  target: {
    common: 'built',
    css: 'built/front-end/public/styles',
    html: 'built/front-end/public',
    fonts: 'built/front-end/public/fonts',
    images: 'built/front-end/public/images'
  }
};

gulp.task('build:clean', function() {
  return del(['dist', PATHS.target.common]);
});

gulp.task('build:js', function(callback) {
    webpack(webpackConfig, function(err, stats) {
      if(err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString());
      callback();
    });
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
