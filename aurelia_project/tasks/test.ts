import * as gulp from 'gulp';
import {Server as Karma} from 'karma';
import {CLIOptions} from 'aurelia-cli';
import * as path from 'path';

let karma = done => {
  new Karma({
    configFile: path.join(__dirname, '/../../karma.conf.js'),
    singleRun: !CLIOptions.hasFlag('watch')
  }, done).start();
};

export { karma as default };
