// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
/*const cssnano = require('cssnano');*/
var server = require('browser-sync').create(); 
var replace = require('gulp-replace');

 
 function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}


// File paths
const files = { 
    scssPath: 'assets/sass/**/*.scss',
    fontPath:'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('assets/css')
    

    ); // put final CSS in dist folder
}

/*function fonts() {
    return src(files.fontPath)
    .pipe(dest('assets/fonts'));
};*/

// Cachebust
function cacheBustTask(){
    var cbString = new Date().getTime();
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

  

// Watch task: watch SCSS files for changes
// If any change, run scss tasks simultaneously
function watchTask(){
    watch([files.scssPath],
        {interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, reload),
            cacheBustTask
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, serve), 
    cacheBustTask,
    watchTask
);