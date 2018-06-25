var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var fileinclude = require('gulp-file-include');
var cssnesting = require('postcss-nesting');
var cssnext = require('postcss-cssnext');
gulp.task('fileinclude', function() {
    gulp.src('src/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html'
        }))
        .pipe(gulp.dest('./'));
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        host: 'localhost',
        port: 3000
    });
});

gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(browserify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
});



gulp.task('css', function () {
    var plugins = [
        cssnesting(),
        cssnext(),
        cssnano()
    ];
    return gulp.src('src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('imageminify', function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// gulp.task('copy', function() {
//     gulp.src([
//         'node_modules/bootstrap/dist/**/*',
//         '!**/npm.js',
//         '!**/bootstrap-theme.*',
//         '!**/*.map'
//     ])
//         .pipe(gulp.dest('vendor/bootstrap'))
//
//     gulp.src(['node_modules/jquery/dist/jquery.js'])
//         .pipe(gulp.dest('public/assets/vendor/jquery'))
//
//     gulp.src(['node_modules/tether/dist/js/tether.js', 'node_modules/tether/dist/js/tether.min.js'])
//         .pipe(gulp.dest('public/assets/vendor/tether'))
//
//     gulp.src(['node_modules/waypoints/lib/jquery.waypoints.js'])
//         .pipe(gulp.dest('public/assets/vendor/waypoints'))
// })



gulp.task('watch', function() {
   // livereload.listen();
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/html/*.html', ['fileinclude']);
});


gulp.task('default', ['imageminify','fileinclude', 'css','scripts','browser-sync', 'watch']);