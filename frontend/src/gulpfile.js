var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var moduleImporter = require('sass-module-importer');

var input = './scss/**/*.scss';
var output = './css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  importer: moduleImporter(),
  includePaths: [
      '../node_modules/bulma'
  ]
};

var sassOptionsProduction = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  importer: moduleImporter()
};

// var autoprefixerOptions = {
//   browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
// };

// var sassdocOptions = {
//   dest: './public/sassdoc'
// };

gulp.task('sass', function () {
  return gulp
    .src(input, { base: 'scss' })
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
});

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptionsProduction))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
});

gulp.task('default', ['sass', 'watch']);
