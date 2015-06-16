'use strict';

// var manifest = require(__dirname + '/../package.json');

var instance = {};

instance.browserSync = require('browser-sync').create();

module.exports = instance;
