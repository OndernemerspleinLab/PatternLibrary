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
                'jsTest/test.js',
            ],
            serveFiles: [
                'jsSource/**/*.js',
                'jsTest/**/*.js',
            ],
        },

        // list of files / patterns to load in the browser
        files: ['../node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'],

        // test results reporter to use
        reporters: ['dots'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};