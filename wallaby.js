// https://github.com/wallabyjs/public/issues/863#issuecomment-259416922
var Module = require('module').Module;
var modulePrototype = Module.prototype;
var originalRequire = modulePrototype.require;
modulePrototype.require = function (filePath) {
    if (filePath === 'source-map-support') {
        return { install: () => { } };
    }
    return originalRequire.call(this, filePath);
};

/* eslint-env node  */
const path = require('path');

const { AureliaPlugin } = require('aurelia-webpack-plugin');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {
    process.env.NODE_PATH += path.delimiter + wallaby.projectCacheDir;

    var wallabyPostprocessor = wallabyWebpack({
        resolve: {
            alias: {
                interact: path.resolve(__dirname, "node_modules", "interactjs", "dist", "interact.js"),
                "jquery-ui-dist": path.resolve(__dirname, "node_modules", "jquery-ui-dist", "jquery-ui.js")
            },
            modules: [path.join(wallaby.projectCacheDir, 'src'), 'node_modules']
        }
    });

    return {
        files: [
            { pattern: "node_modules/babel-polyfill/browser.js", instrument: false },
            { pattern: "node_modules/jquery/dist/jquery.js", instrument: false },
            { pattern: "node_modules/jquery-ui-dist/jquery-ui.js", instrument: false },
            { pattern: "src/**/*.ts", load: false },
            { pattern: "test/stubs/**/*.ts", load: false },
            { pattern: "test/fakes/**/*.ts", load: false },
            { pattern: "test/unit/*.ts", load: false },
            { pattern: 'node_modules/interactjs/dist/interact.js', instrument: false }
        ],

        tests: [
            { pattern: "test/unit/**/*.spec.ts", load: false }
        ],

        env: {
            kind: "electron"
        },

        postprocessor: wallabyPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
