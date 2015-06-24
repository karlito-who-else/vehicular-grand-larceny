'use strict';

import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('videos', () => {
  return gulp.src(config.path.source.base + config.files.videos)
    .pipe(debug({
      title: 'videos:'
    }))
    .pipe(ffmpeg('mp4', function(cmd) {
      return cmd
        .audioBitrate(192)
        .audioChannels(2)
        .audioCodec('libfdk_aac')
        // .audioCodec('libfdk-aac')
        // .audioCodec('libvo_aacenc')
        // .audioCodec('libfaac')
        // .audioCodec('libvo-aacenc')
        // .audioCodec('libmp3lame')
        .audioFrequency(22050)
        .fps(24)
        .videoBitrate('512k')
        .videoCodec('libx264')
        .on('end', function() {
          console.log('sounds: Processing finished');
        })
        .on('error', util.log);
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('videos:watch', function() {
  gulp.watch(config.path.source.base + config.files.videos, ['videos']);
});
