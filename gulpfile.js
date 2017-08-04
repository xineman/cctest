const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack-stream');
var concatCss = require('gulp-concat-css');
var webpack2 = require("webpack");

gulp.task('default', ['watch']);

//Compile SCSS
gulp.task('sass', function() {
    return gulp.src('app/public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/public/css'))
        // .pipe(browserSync.stream())
});

gulp.task('concat-css',['sass'], function () {
  return gulp.src(['app/public/css/**/*.css', "!app/public/css/styles.css"])
    .pipe(concatCss("styles.css"))
    .pipe(gulp.dest('app/public/css'));
});

// Bundle scripts using webpack
gulp.task('webpack' ,function() {
  return gulp.src('app/public/js/index.js')
    .pipe(webpack( require('./webpack.config.js'), webpack2 ))
    .pipe(gulp.dest('app/public/js'));
});

//DEVELOPMENT
gulp.task("watch",['concat-css'], ()=> {
  gulp.watch("app/public/scss/**/*.scss", ['concat-css']);
  // gulp.watch(["app/js/**/*.js","!app/js/main.js","!app/js/libs.js"], ['webpack']);
});


//PRODUCTION
gulp.task('build', ['clean', 'index', 'min-css', 'webpack-prod'], function() {
    gulp.src('app/public/img/*').pipe(gulp.dest('dist/img'));
    // gulp.src('app/fonts/*').pipe(gulp.dest('dist/client/fonts'));
    // gulp.src('app/*.*').pipe(gulp.dest('dist/client/'));
});

//webpack with production config
gulp.task('webpack-prod' ,function() {
  return gulp.src('app/public/js/client.js')
    .pipe(webpack( require('./webpack-prod.config.js'), webpack2 ))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

//Replace CSS and JS pathes for production
gulp.task('index', () => {
  gulp.src('app/public/index.html')
    .pipe(htmlreplace({
      'css': 'css/styles.min.css',
      'js': ['js/manifest.min.js', 'js/libs.min.js','js/main.min.js']
    }))
    .pipe(gulp.dest('dist/'));
});

//Minify CSS
gulp.task('min-css', ['concat-css'], function() {
    return gulp.src('app/public/css/styles.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});
