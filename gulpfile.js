//===
// IMPORTS
//===
const { series, parallel, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const exec = require('gulp-exec');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sass = require('gulp-dart-sass');
const htmlmin = require('gulp-htmlmin');

//===
// VARIABLES
//===
const SRC_PATH = 'src/assets';
const DEST_PATH = 'public';
const DIST_JS = 'main.min.js';

//===
// TASKS
//===

// Static server with reload
function initBrowserSync(cb) {
    browserSync.init({
        /*server: {   // Folder
            baseDir: "./" + DEST_PATH
        }*/
        proxy: "localhost:8000"
    });
    return cb;
}

// Delete dist folder
function cleanOld() {
    return src('.')
        // .pipe(exec('rm -rf dist')) LINUX
        .pipe(exec('rmdir dist')) // WINDOWS
        .pipe(exec('mkdir dist'));
}

// HTML min
function html() {
    return src(SRC_PATH + '/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(DEST_PATH))
        .pipe(browserSync.stream()) ;
}

// Compile SASS + sourcemaps
function sassCompile() {
    return src([SRC_PATH + '/sass/mobile.sass', SRC_PATH + '/sass/desktop.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(DEST_PATH + '/css/'))
        .pipe(browserSync.stream()) ;
}

// IMGs
function img() {
    return src(SRC_PATH + '/img/**/*',{'allowEmpty':true})
        .pipe(dest(DEST_PATH + '/img/'))
        .pipe(browserSync.stream()) ;
}

// Copy fonts
function fonts() {
    return src(SRC_PATH + "/fonts/**/*")
        .pipe(dest(DEST_PATH + "/fonts/"))
        .pipe(browserSync.stream());
}

// JS concat + sourcemaps + babel + min
function js() {
    return src([SRC_PATH + '/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat(DIST_JS))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(DEST_PATH + '/js/'))
        .pipe(browserSync.stream()) ;
}

//===
// Commands
//===
// cleanOld,
const build = series( parallel(html, sassCompile, img, fonts, js));

// gulp dev
exports.dev = function () {
    build();
    watch(SRC_PATH + '/*.html', html);
    watch([SRC_PATH + '/sass/*.sass', SRC_PATH + '/sass/**/*.sass'], sassCompile);
    watch(SRC_PATH + '/**/*', img);
    watch(SRC_PATH + '/js/*.js', js);
    initBrowserSync();
}

// gulp
exports.default = build;
