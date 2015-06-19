import fs from 'fs';
import glob from 'glob';
import gulp from 'gulp';
import path from 'path';

import config from './_config.js';

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
gulp.task('precache', function(callback) {
  var filePath = path.join(config.path.base, 'precache.json');

  glob('{elements, scripts, styles}/**/*.*',
    {
      cwd: config.path.base
    }, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files.push(
        'index.html',
        './',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js'
      );
      fs.writeFile(filePath, JSON.stringify(files), callback);
    }
  });
});
