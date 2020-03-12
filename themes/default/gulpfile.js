var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sassdoc = require('sassdoc')
var moduleImporter = require('sass-module-importer')

var envify = require('envify/custom')




/* nicer browserify errors */
var log = require('fancy-log')
var chalk = require('chalk')

var input = './scss/**/*.scss'
var output = './css'

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    sourceMap: true,
    importer: moduleImporter(),
    includePaths: [
        './node_modules/bulma'
    ]
}

var autoprefixerOptions = {
    remove: false
};

function map_error(err) {
    if (err.fileName) {
        // regular error
        log(chalk.red(err.name) +
            ': ' +
            chalk.yellow(err.fileName.replace(__dirname + '/js/', '')) +
            ': ' +
            'Line ' +
            chalk.magenta(err.lineNumber) +
            ' & ' +
            'Column ' +
            chalk.magenta(err.columnNumber || err.column) +
            ': ' +
            chalk.blue(err.description))
    } else {
        // browserify error..
        log(chalk.red(err.name) +
            ': ' +
            chalk.yellow(err.message))
    }

    this.emit('end')
}

gulp.task('sass', function() {
    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
})

/* */

gulp.task('watchify', function() {
    var args = merge(watchify.args, {
        debug: true
    })
    var bundler = watchify(browserify('./js/main.js', args)).transform("babelify", { })
    bundle_js(bundler)

    bundler.on('update', function(ids) {
        log(chalk.green('File(s) changed: ') + chalk.white(ids));
        bundle_js(bundler)
    })

    bundler.on('log', function (msg) {
        log(chalk.green(msg) + chalk.white(''));
    })

    gulp
        // Watch the input folder for change,
        // and run `sass` task when something happens
        .watch(input, gulp.series('sass'))
        // When there is a change,
        // log a message in the console
        .on('change', function(path, stats) {
            console.log('File ' + path + ' was changed, running tasks...');
        })
})

function bundle_js(bundler) {
    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'))
}

// Without watchify
gulp.task('browserify', function() {
    var bundler = browserify('./js/main.js', {
        debug: true
    }).transform(babelify, { /* options */ })

    return bundle_js(bundler)
})

gulp.task('sass-production', function () {
    sassOptions.outputStyle = 'compressed';

    return gulp
        .src(input)
        .pipe(sass(sassOptions))
        .pipe(autoprefixer())
        .pipe(gulp.dest(output));
});

// Without sourcemaps
gulp.task('production', gulp.series('sass-production', function() {
    var bundler = browserify('./js/main.js')
                    .transform("babelify",
                        { global: true },
                        envify({
                            NODE_ENV: 'production'
                        })
                    );

    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
}))

gulp.task('js-production', function() {
    var bundler = browserify('./js/main.js').transform("babelify", { /* options */ })

    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', gulp.series('watchify'))
