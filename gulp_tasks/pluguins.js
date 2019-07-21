const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');