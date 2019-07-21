'use strict';
require('../routes.js');

// const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso');
// const sourcemaps = require('gulp-sourcemaps');
// const postcss = require('gulp-postcss');
// const cssnano = require('cssnano');
// const rename = require('gulp-rename');
// const utils = require('./utils');
const browserSync  = require('browser-sync');

const minifyCSS = require('gulp-csso');

const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');


const browserSyncOption = {
  port: 5000,　//defaultは3000です。
  server : {
    baseDir : CONF.BROWSERSYNC.DOCUMENT_ROOT,
    index : CONF.BROWSERSYNC.INDEX,
  },
  ghostMode : CONF.BROWSERSYNC.GHOSTMODE,
  reloadOnRestart: true,
};


function css() {
    return src(CONF.SASS.SRC)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(dest(CONF.SASS.ULR))
}



function typescript() {
  return src(CONF.TS.ULR)
      .pipe(ts({
          noImplicitAny: true,
          outFile: 'functions.min.js' //変更したファイル名
      }))
      .pipe(uglify())
      .pipe(dest(CONF.TS.ULR))
}

function browsersync(done) {
browserSync.init(browserSyncOption);
done();
}

//HotReloading対応したいので、browserSync.reload()を適用してます。
function watchFiles(done) {
const browserReload = () => {
  browserSync.reload();
  done();
};
watch(CONF.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.html').on('change', series(browserReload));
watch(CONF.SASS.WATCH).on('change', series(css, browserReload));
watch(CONF.TS.WATCH).on('change', series(typescript, browserReload));
}

exports.css = css;
exports.typescript = typescript;
exports.default = series(parallel( typescript, css ), series(browsersync, watchFiles));