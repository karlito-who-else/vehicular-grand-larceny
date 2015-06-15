#!/bin/sh

if [ -f .git/config ]; then

  if hash git 2>/dev/null; then
    git config core.ignorecase false
  else
    echo "git not installed"
    exit
  fi

fi

if [ -f Gemfile ]; then

  if hash ruby 2>/dev/null; then

    if hash update_rubygems 2>/dev/null; then
      #sudo update_rubygems
      update_rubygems
    else
      echo "update_rubygems not installed"
    fi

    if hash gem 2>/dev/null; then
      gem update --system
      gem install bundler
    else
      echo "gem not installed"
      exit
    fi

    if hash bundle 2>/dev/null; then
      bundle install
    else
      echo "bundle not installed"
      exit
    fi

  else
    echo "ruby not installed"
    exit
  fi

fi

if [ -f package.json ]; then

  if hash npm 2>/dev/null; then

    if [ -f node_modules ]; then
      npm update
    else
      npm install
    fi

    if [ -f bower.json ]; then

      if hash bower 2>/dev/null; then

        if [ -f www/bower_components ]; then
          #bower cache clean;
          bower update;
        else
          bower install;
        fi

      else
        echo "bower not installed"
        exit
      fi

    fi

    if [ -f gulpfile.js ]; then

      if hash gulp 2>/dev/null; then
        gulp
      else
        echo "gulp not installed"
        exit
      fi

    fi

  else
    echo "npm not installed"
    exit
  fi

fi
