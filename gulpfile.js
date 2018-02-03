var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sourcemaps.init()) //inicjalizacja map kodu źródłowego
        .pipe(sass().on('error',sass.logError)) // wyświetlanie błędów w konsoli
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        })) //uruchomienie konwersji sass do css w formacie skompesowanym
        .pipe(sourcemaps.write()) //dopisanie map kodu źródłowego
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
});

//obserwator plików
gulp.task('watch', function() {
    browserSync.init({
        server: ".",
        notify: true,
        open: true
    });
    //obserwacja sassa
    gulp.watch('scss/*.scss', ['sass']);
    //obserwacja htmla
    gulp.watch('./index.html', browserSync.reload);
});