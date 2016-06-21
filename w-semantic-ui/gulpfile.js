var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var paths = {
    pug: ['views/*.pug', './'],
    sass: ['origin/sass/*.scss', './public/css'],
    es6: ['origin/es6/*.js', './public/js'],
    img: ['origin/imgs/*', './public/imgs']
};


gulp.task('pug', function() {
    return gulp.src(paths.pug[0])
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.pug[1]));
});
gulp.task('sass', function() {
    return gulp.src(paths.sass[0])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.sass[1]));
});

gulp.task('es6', function() {
    return gulp.src(paths.es6[0])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.es6[1]));
});

gulp.task('img', function() {
    return gulp.src(paths.img[0])
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.img[1]));
});

gulp.task('watch', function() {
    gulp.watch('views/**/*.pug', ['pug']);
    gulp.watch('origin/sass/**/*.scss', ['sass']);
    gulp.watch(paths.es6[0], ['es6']);
});

gulp.task('default', ['watch']);
