module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: __dirname + '/../source',

        // frameworks to use
        frameworks: ['jspm', 'jasmine'],

        jspm: {
            config: 'jsSource/config.js',
            packages: "jsSource/jspm_packages/",
            // useBundles: true,
            loadFiles: [
                'jsTest/testConfig.js',
                'jsTest/mainSpec.js',
            ],
            serveFiles: [
                'jsSource/jspm_packages/**/*.js',
                'jsSource/**/*.js',
                'jsTest/**/*.js',
            ],
        },

        babelPreprocessor: { options: { sourceMaps: 'inline', blacklist: ['useStrict'], }, },
        preprocessors: {
            'jsSource/*.js': ['coverage'],
            'jsSource/!(jspm_packages)/**/*.js': ['coverage'],
            'jsSource/jspm_packages/**/*.js': [],
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary',
                },
                {
                    type: 'html',
                    dir: '../coverage/',
                },
            ],
            // configure the reporter to use isparta for JavaScript coverage
            // Only on { "karma-coverage": "douglasduteil/karma-coverage#next" }
            instrumenters: { isparta : require('isparta') },
            instrumenter: {
                '**/*.js': 'isparta'
            },
            instrumenterOptions: {
                isparta: { babel: {  }, },
            },
        },

        // list of files / patterns to load in the browser
        files: ['../node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'],

        // test results reporter to use
        reporters: ['coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};