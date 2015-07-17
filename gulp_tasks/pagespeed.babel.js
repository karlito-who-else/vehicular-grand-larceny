'use strict';

// import debug from 'gulp-debug';
import gulp from 'gulp';
import {output as pagespeed} from 'psi';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

gulp.task('pagespeed', cb => {
  pagespeed(config.domain, {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    key: config.instance.pagespeed.key
  }, cb)
  .on('error', reportError);
});
