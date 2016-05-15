var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../gulp.config')();
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var Builder = require('systemjs-builder'),
    surge = require('gulp-surge'),
    embedTemplates = require('gulp-angular-embed-templates'),
    rename = require("gulp-rename");

/* Prepare build using SystemJS Builder */
gulp.task('build', function (done) {
    runSequence('compile-templates', done);
});

gulp.task('deploy', ['build', 'rename-index'], function () {
    return surge({
        project: './build',
        domain: config.domain
    })
});

// https://surge.sh/help/adding-a-200-page-for-client-side-routing
gulp.task('rename-index', ['build'], function () {
    return gulp.src(config.build.path + 'index.html')
        .pipe(rename(config.build.path + '200.html'))
        .pipe(gulp.dest(config.root));
});

gulp.task('build-sjs', function (done) {
    runSequence('build-assets', 'tsc-app', buildSJS);
    function buildSJS () {
        var builder = new Builder();
        builder.loadConfig('./systemjs.conf.js')
        .then(function() {
            return builder
                .bundle(config.app + 'main.js',
                        config.build.path + config.app + 'main.js',
                config.systemJs.builder);
        })
        .then(function() {
            console.log('Build complete');
            done();
        })
        .catch(function (ex) {
            console.log('error', ex);
            done('Build failed.');
        });
    }
});

/* Concat and minify/uglify all css, js, and copy fonts */
gulp.task('build-assets', function (done) {
    runSequence('clean-build', ['sass', 'fonts'], function () {
        done();

        gulp.src(config.app + '**/*.css', {
            base: config.app
        })
        .pipe(cssnano())
        .pipe(gulp.dest(config.build.app));

        gulp.src(config.assetsPath.images + '**/*.*', {
            base: config.assetsPath.images
        })
        .pipe(gulp.dest(config.build.assetPath + 'img'));

        return gulp.src(config.index)
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', cssnano()))
            .pipe(gulpif('!*.html', rev()))
            .pipe(revReplace())
            .pipe(gulp.dest(config.build.path));
    });
});

gulp.task('compile-templates', ['build-sjs'], function () {
    return gulp.src(config.build.app + 'main.js')
        .pipe(embedTemplates({
            basePath: './',
            sourceType: 'ts',
            minimize: {
                quotes: true
            }
        }))
        .pipe(gulp.dest(config.build.app));
});

/* Copy fonts in packages */
gulp.task('fonts', function () {
    gulp.src(config.assetsPath.fonts + '**/*.*', {
        base: config.assetsPath.fonts
    })
    .pipe(gulp.dest(config.build.fonts));

    gulp.src([
        'node_modules/font-awesome/fonts/*.*'
    ])
    .pipe(gulp.dest(config.build.fonts));
});
