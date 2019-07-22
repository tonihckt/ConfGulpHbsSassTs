// const projectURL = 'http://project7337.local'; // Local project URL of your already running WordPress site. Could be something like local.dev or localhost:8888.
//  IMPORTS
// require('./gulp_tasks/css/sass.js');
// require('./gulp_tasks/routes.js');

const { src, dest, parallel, series, watch } = require('gulp');
//  REQUIRES _ HTML (marckup)
const handlebars = require('gulp-compile-handlebars');
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
//  REQUIRES _ CSS (stylesheets)
// const stylus = require('gulp-stylus');
const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
const minifyCSS = require('gulp-csso');
const cleanCSS     = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const cssbeautify = require('gulp-cssbeautify');
// const cssnext = require('postcss-cssnext');
//  REQUIRES _ JS (javascripts)
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const rigger  = require('gulp-rigger');
const coffee = require('gulp-coffee');
//  REQUIRES _ PHP ()
const twig = require('gulp-twig');
//  REQUIRES _ UTILS
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');
const notify = require("gulp-notify");
//  REQUIRES _ BROWSER
const browserSync  = require('browser-sync');
const Fiber        = require('fibers'); // evita la sobrecarga asincrona
//  REQUIRES _ IMG
const imagemin = require('gulp-imagemin');



// -------------  ROUTES
// 
//
const CONF = {
    GLOBAL :{
        SOURCE : './src',
        OUTPUT : './public',
    },
    FONTS :{
      SOURCE : './src/fonts/**/*.*',
      OUTPUT : './public/assets/fonts',
    },  
    IMG :{
      SOURCE : './src/img/**/*.{gif,jpg,jpeg,png,svg}',
      // SOURCE : './images/**/*.+(jpg|jpeg|JPG|png|PNG|gif|GIF)',
      OUTPUT : './public/assets/img',
    }, 
    SASS : {
        // SOURCE : './src/css/**/*.scss',
        SOURCE : './src/css/**/*.{sass,scss}',
        OUTPUT : './public/assets/css',
    },
    STYL : {
      SOURCE : './src/css/**/*.styl',
      OUTPUT : './public/assets/css',
    },
    TS : {
        SOURCE : './src/js/**/*.ts',
        OUTPUT : './public/assets/js',
    },
    BABEL : {
      SOURCE : './src/js/**/*.js',
      OUTPUT : './public/assets/js',
    },
    LIBS: {
      SOURCE : './src/libs/**/*.{css,js}',
      OUTPUT : './public/assets/libs',     
    },
    PHP : {
      SOURCE : './src/views/**/*.php',
      OUTPUT : './public/',
    },
    TWIG: {
      SOURCE : './src/_marckup/twig/**/*.twig',
      OUTPUT : './public/',
      EXCLUDE: '!./src/_marckup/src/twig/**/_*.twig',
    },
    // PUG : {
    //     SOURCE : './src/_marckup/pug/**/*.pug',
    //     OUTPUT : './public/',
    //     DIRECTORY_FOLDERS :{
    //       PAGES: './src/_marckup/pug/pages/*.pug',
    //       PARTIALS: './src/_marckup/pug/partials',
    //     }
    // },
    HBS : {
        SOURCE : './src/views/**/*.hbs',
        OUTPUT : './public/',
        DIRECTORY_FOLDERS :{
            PAGES: './src/views/pages/*.hbs',
            PARTIALS: './src/views/partials',
        }
    },
    BROWSERSYNC : {
        DOCUMENT_ROOT : './public',
        INDEX : 'index.html',
        GHOSTMODE : {
            clicks : false,
            forms  : false,
            scroll : false,
        }
    },
};

// -------------  BROWSER
// 
// 
const browserSyncOption = {
  notify: true,
  port: 7337,　//default 3000
  ui: {
    port: 7337,
    weinre: {
      port: 7373
    }
  },
  server : {
    baseDir : CONF.BROWSERSYNC.DOCUMENT_ROOT,
    index : CONF.BROWSERSYNC.INDEX,
  },
  ghostMode : CONF.BROWSERSYNC.GHOSTMODE,
  reloadOnRestart: true,
};

// -------------  CLEAN
// gulp.task('clean', () => del(CONF.GLOBAL.OUTPUT));
// function cleanConf() {
// 	return del(CONF.GLOBAL.OUTPUT);
// }

// -------------  HBS _ HTML
// 
// 
function handlebarsConfig() {
    return src(CONF.HBS.DIRECTORY_FOLDERS.PAGES)
      .pipe(handlebars({}, {
        ignorePartials: true,
        batch: [CONF.HBS.DIRECTORY_FOLDERS.PARTIALS]
      }))
      .pipe(rename({
        extname: '.html'
      }))
      // .pipe(
      //     htmlmin({
      //       collapseWhitespace: true,
      //       minifyJS: true,
      //       removeComments: true,
      //     })
      // )
      .pipe(dest(CONF.HBS.OUTPUT))
}

// -------------  PUG _ HTML
// 
// 

// function pugConfig() {
//     return src(CONF.PUG.SOURCE)
//       // .pipe(
//       //   plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
//       // )
//       .pipe(pug
//         ({
//           // basedir: 'src',
//           pretty: true,
//         })
//       )
//       .pipe(dest(CONF.PUG.OUTPUT))
// }


// -------------  AUTOPREFIXER _ BROWSERS
const autoprefixerBrowsers = [
  'last 2 versions',
  '> 5%',
  'ie = 11',
  // 'ie_mob >= 10',
  'not ie <= 10',
  // 'ff >= 30',
  // 'chrome >= 34',
  // 'safari >= 7',
  // 'opera >= 23',
  'ios >= 8',
  'and_chr >= 5',
  'Android >= 5',
  // 'bb >= 10',
]

// -------------  SCSS _ CSS
// 
// 
function cssConfig() {
  return src(CONF.SASS.SOURCE)
    // .pipe(sass({fiber: Fiber}).on('error', sass.logError))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compact',
      precision: 10
    }))
    .on('error', console.error.bind(console))
    .pipe( autoprefixer([
      'last 15 versions',
      '> 1%',
      'ie >= 8',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]) )
    .pipe(cssbeautify())
    // .pipe(postcss([cssnext(autoprefixerBrowsers)]))  
    .pipe(minifyCSS())
    // .pipe( rename({ suffix: '.min' }) )
    .pipe(dest(CONF.SASS.OUTPUT))
}

// -------------  TS _ JS
// 
// 
// function typescriptConfig() {
//     return src(CONF.TS.SOURCE)
//         .pipe(ts({
//             noImplicitAny: true,
//             outFile: 'functions.min.js'
//         }))
//         .pipe(uglify())
//         .pipe(dest(CONF.TS.OUTPUT))
// }

// -------------  BABEL _ JS
// 
// 
function babelConfig() {
  return src(CONF.BABEL.SOURCE, { sourcemaps: true })
      .pipe(babel({
        presets: [
          // '@babel/preset-react',
          '@babel/preset-env',
        ],
      }))
      .pipe(plumber())
      .pipe(rigger())
      .pipe(dest(CONF.BABEL.OUTPUT))
      .pipe(uglify())
      .pipe( rename({ suffix: '.min' }) )
      .pipe(dest(CONF.BABEL.OUTPUT))
}

// -------------  IMAGE _ IMG-MIN
// 
// 

function imagesConfig() {
  return src(CONF.IMG.SOURCE)
      // .pipe(changed(CONF.IMG.OUTPUT))
      .pipe( imagemin(
        // [
        //   imagemin.gifsicle({interlaced: true}),
        //   imagemin.jpegtran({progressive: true}),
        //   imagemin.optipng({optimizationLevel: 5})
        // ]
        {
          optimizationLevel: 3,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          interlaced: true
        }
      ))
      .pipe(dest(CONF.IMG.OUTPUT))
}


// -------------  LOAD LIBS
// 
//
function libsConfig () {
  //   return src([
	// 	'./src/libs/modernizr/modernizr.js',    
  // ])
  return src(CONF.LIBS.SOURCE)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe( rename({ suffix: '.min' }) )
    .pipe(dest(CONF.LIBS.OUTPUT))
}

// -------------  LOAD FONTS
// 
//
function fontsConfig () {
	return gulp.src(CONF.FONTS.SOURCE, {since: gulp.lastRun('fonts')})
	.pipe(gulp.dest(CONF.FONTS.OUTPUT))
}

// -------------  WATCH
// 
//
function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}
// HotReloading _ browserSync.reload()
function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  watch(CONF.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.html').on('change', series(browserReload));
  watch(CONF.SASS.SOURCE).on('change', series(cssConfig, browserReload));
  // watch(CONF.TS.SOURCE).on('change', series(typescriptConfig, browserReload));
  watch(CONF.BABEL.SOURCE).on('change', series(babelConfig, browserReload));
  watch(CONF.HBS.SOURCE).on('change', series(handlebarsConfig, browserReload));
  watch(CONF.LIBS.SOURCE).on('change', series(libsConfig, browserReload));
  watch(CONF.FONTS.SOURCE).on('change', series(fontsConfig, browserReload));
  watch(CONF.IMG.SOURCE).on('change', series(imagesConfig, browserReload));
}

// -------------  EXPORT COMMANDS
// $ -> gulp 
//
exports.css = cssConfig;
exports.hbs = handlebarsConfig;
// exports.typescript = typescriptConfig;
exports.babel = babelConfig;
exports.libs = libsConfig;
exports.fonts = fontsConfig;
exports.imgs = imagesConfig;
exports.default = series(parallel(babelConfig, cssConfig, handlebarsConfig), series(browsersync, watchFiles)); 
// exports.default = series(parallel(babelConfig, cssConfig, handlebarsConfig, libsConfig, fontsConfig,imagesConfig), series(browsersync, watchFiles)); 
