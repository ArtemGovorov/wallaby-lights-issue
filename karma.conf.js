// Karma configuration
// Generated on Fri Dec 05 2014 16:49:29 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: "node_modules/babel-polyfill/browser.js", watched: false },
      {pattern: 'test/unit/**/*.ts', watched: false}
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/unit/**/*.ts': ['webpack']
    },

    // list of files to exclude
    exclude: [],

    webpack: require('./webpack.config.js')(),

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    webpackServer: { noInfo: true },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};