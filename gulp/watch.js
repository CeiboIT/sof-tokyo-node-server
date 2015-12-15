'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('watch', ['scripts'], function () {

  gulp.watch([
    path.join(conf.paths.src, '/*.ts'),
    path.join(conf.paths.src, '/modules/**/*.ts')
  ], function(event) {
      gulp.start('scripts');
  });
});
