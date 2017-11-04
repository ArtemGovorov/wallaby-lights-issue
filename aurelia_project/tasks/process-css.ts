import * as gulp from 'gulp';
import * as sourcemaps from 'gulp-sourcemaps';
import * as sass from 'gulp-sass';
import * as project from '../aurelia.json';
import {CLIOptions} from 'aurelia-cli';
import {build} from 'aurelia-cli';
import utils = require('gulp-util');
import postcss = require('gulp-postcss');
import postcssAnimation = require('postcss-animation');
import postcssResponsiveType = require('postcss-responsive-type');
import postcssQuantityQueries = require('postcss-quantity-queries');
import autoprefixer = require('gulp-autoprefixer');
import cssnano = require('gulp-cssnano');
import rev = require('gulp-rev');
import lost = require('lost');

export default function processCSS() {
  const processors = [
    lost(),
    postcssAnimation(),
    postcssResponsiveType(),
    postcssQuantityQueries()
  ];

  return gulp.src(project.cssProcessor.source)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss(processors))
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(CLIOptions.getEnvironment() === 'dev' ? cssnano() : utils.noop())
    .pipe(build.bundle());
}
