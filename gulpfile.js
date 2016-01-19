/* global require */
var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    stylish = require('jshint-stylish');

var dirs = {
  src: './src-frontend',
  dist: './build',
  bower: './bower_components'
};

var paths = {
  scripts: {
    app: [dirs.src + '/app/**/*.js'],
    angular: [
      dirs.bower + '/angular/angular.js',
      dirs.bower + '/angular-ui-router/release/angular-ui-router.js',
      dirs.bower + '/angular-cookies/angular-cookies.js',
      dirs.bower + '/angular-material/angular-material.js',
      dirs.bower + '/angular-animate/angular-animate.js',
      dirs.bower + '/angular-aria/angular-aria.js',
      dirs.bower + '/firebase/firebase.js'
    ]
  },
  scss: [
    dirs.src + '/assets/scss/style.scss',
    dirs.bower + '/angular-material/angular-material.scss'
  ],
  html: [
    dirs.src + '/app/**/*.html'
  ],
  cleanup: [
    dirs.dist + '/**/*.*',
    '!' + dirs.dist + '/.gitignore'
  ]
};

gulp.task('cleanup', function() {
  return del(paths.cleanup, {force: true});
});

gulp.task('lint', [], function() {
  var path = [dirs.src + '/app/**/*.js'];
  return gulp.src(path)
    .pipe(jshint(dirs.src + '/.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('scss', [], function() {
  return gulp.src(paths.scss)
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('style.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dirs.dist + '/assets/css'));
});

gulp.task('app', [], function() {
  return gulp.src(['./src-frontend/app/**/module.js', './src-frontend/app/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('scripts', [], function() {
  return gulp.src(paths.scripts.angular)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('html', [], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(dirs.dist + '/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts.app, ['lint', 'app']);
  gulp.watch(dirs.src + '/assets/scss/*.scss', ['scss']);
  gulp.watch(paths.html, ['html']);  
});

gulp.task('dev', ['scripts', 'app', 'html', 'scss', 'watch']);
gulp.task('build', ['scripts', 'app', 'html', 'scss']);