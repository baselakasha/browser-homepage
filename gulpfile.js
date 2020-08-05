const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const imagemin = require("gulp-imagemin");
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const inlinesource = require('gulp-inline-source');
const treser = require("gulp-terser");
const browserSync = require('browser-sync');
const conf = {
    paths: {
        src : {
            sass : "./src/sass/**/*.scss",
            html : "./src/**/*.html",
            js: "./src/js/**/*.js",
            images: "./src/img/**/*.*",
        },
        dest : {
            css: "./dist/style/",
            html: "./dist/",
            js : "./dist/js/",
            images: "./dist/img/",
        },
        build: {
            html: "./build/"
        }
    },
    browser_sync: {
        files: ["./dist/"],
        server: "./dist",
        port: 8080
    }
}


function scss() {
    return gulp.src(conf.paths.src.sass)
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(gulp.dest(conf.paths.dest.css));
}
function html(){
    return gulp.src(conf.paths.src.html)
    .pipe(inlinesource())
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(conf.paths.dest.html))
    .pipe(gulp.dest(conf.paths.build.html));
}
function js(){
    return gulp.src(conf.paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(treser())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(conf.paths.dest.js));
}
function images() {
    return gulp.src(conf.paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(conf.paths.dest.images))
}
function watch() {
    scss();
    js();
    images();
    html();
    gulp.watch(conf.paths.src.sass, scss);
    gulp.watch(conf.paths.src.js, js);
    gulp.watch(conf.paths.src.images, images);
    gulp.watch(conf.paths.src.html, html);
    browserSync.init(conf.browser_sync);
}

exports.build = gulp.parallel(scss, js, images, html);
exports.watch = watch;