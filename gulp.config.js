var historyApiFallback = require('connect-history-api-fallback');

module.exports = function () {
    var domain = 'eliftech.2016.angularattack.io';
    var root = '';
    var app = root + 'app/';
    var viewsFiles = root + 'views/**/*.html';
    var assets = root + 'assets/';
    var assetsPath = {
        styles: assets + 'styles/',
        images: assets + 'img/',
        fonts: assets + 'fonts/'
    };
    var index = root + 'index.html';
    var tsFiles = [
        app + '**/!(*.spec)+(.ts)'
    ];
    var build = {
        path: 'build/',
        app: 'build/app/',
        fonts: 'build/fonts',
        assetPath: 'build/assets/',
        assets: {
            lib: {
                js: 'lib.js',
                css: 'lib.css'
            }
        }
    };
    var report = {
        path: 'report/'
    };
    var browserSync = {
        dev: {
            port: 3000,
            server: {
                baseDir: './',
                middleware: [historyApiFallback()]
            },
            files: [
                "index.html",
                "systemjs.conf.js",
                "assets/styles/main.css",
                "app/**/*.js",
                "views/**/*.html"
            ]
        },
        prod: {
            port: 3001,
            server: {
                baseDir: './' + build.path,
                middleware: [historyApiFallback()]
            }
        }
    };

    var systemJs = {
        builder: {
            normalize: true,
            minify: true,
            mangle: true,
            globalDefs: { DEBUG: false }
        }
    };

    return {
        domain: domain,
        root: root,
        app: app,
        viewsFiles: viewsFiles,
        assets: assets,
        index: index,
        build: build,
        report: report,
        assetsPath: assetsPath,
        tsFiles: tsFiles,
        browserSync: browserSync,
        systemJs: systemJs
    };
};
