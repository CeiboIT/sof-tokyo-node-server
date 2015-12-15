'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

  var tsProject = $.typescript.createProject({
    target: 'es5',
    module: 'commonjs',
    declaration: true
  });

  gulp.task('scripts', ['tsd:install'], function () {
  return gulp.src(path.join(conf.paths.src, '/**/*.ts'))
    .pipe($.sourcemaps.init())
    .pipe($.tslint())
    .pipe($.tslint.report('prose', { emitError: false }))
    .pipe($.typescript(tsProject)).on('error', conf.errorHandler('TypeScript'))
    //.pipe($.concat('index.module.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '')))
    .pipe($.size())
});
