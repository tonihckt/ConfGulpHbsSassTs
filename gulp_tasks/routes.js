// ------------- ROUTES
// 
// 
const CONF = {

  SASS : {
    SRC   : './src/css/*.scss',
    ULR   : './public/src/css',
    WATCH : './src/css/**/*.scss',
  },

  TS : {
    SRC   : './src/js/*.ts',
    ULR   : './app/src/js',
    WATCH : './src/js/**/*.ts',
  },

  JS : {
    SRC   : './src/js/*.js',
    ULR   : './app/src/js',
    WATCH : './src/js/**/*.js',
  },

  HTML : {
    SRC   : './src/*.html',
    ULR   : './app/src',
    WATCH : './src/**/*.html',
  },

  PHP : {
    SRC   : './src/*.php',
    ULR   : './app/src',
    WATCH : './src/**/*.php',
  },

  PUG : {
    SRC   : './src/*.pug',
    ULR   : './app/src',
    WATCH : './src/**/*.pug',
  },

  HBS : {
    SRC   : './src/*.hbs',
    ULR   : './app/src',
    WATCH : './src/**/*.hbs',
  },

  BROWSERSYNC : {
    DOCUMENT_ROOT : './app',
    INDEX : 'index.html',
    GHOSTMODE : {
        clicks : false,
        forms  : false,
        scroll : false,
    }
  },
}

// const pathSRC = {
//     css:    './src/scss/*.scss',
//     js:     './src/js/*.js',
//     html:   './src/**/*.html',
//     pug:    './src/**/*.pug',
//     php:    './src/**/*.php',
//     hbs:    './src/**/*.hbs'
//   }
  
//   const pathURL = {
//     css:   './dist/src/css/',
//     js:     './dist/src/js/',
//     html:   './dist/',
//     map:    './'
//   }
  
//   const pathWATCH = {
//     css:    './src/scss/**/*.scss',
//     js:     './src/js/**/*.js',
//     html:   './src/**/*.html',
//     pug:    './src/**/*.pug',
//     hbs:    './src/**/*.hbs',
//     php:    './src/**/*.php'
//   }
  