/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var elixir = require('laravel-elixir');
elixir(function(mix) {
    mix.sass('app.scss');
    mix.scripts([]);
});


var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject({
    declaration: false,
    noExternalResolve: true,
    out: 'output.js'
});

gulp.task('scripts', function() {
    return gulp.src('typescript/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('resources/assets/js'));
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('typescript/**/*.ts', ['scripts']);
});

