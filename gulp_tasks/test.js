'use strict';

var gulp = require('gulp');

// var config = require(__dirname + '/_config');

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try {
  require('web-component-tester').gulp.init(gulp);
}
catch (err) {
  console.log('Error encountered when requiring web-component-tester');
}
