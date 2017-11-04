// for some reason these imports need to be registered in tsconfig.json
// or else awesome-typescript-loader throws errors

import 'aurelia-polyfills';
import {initialize} from 'aurelia-pal-browser';
initialize();

// enable log messages
import { ConsoleNodeAppender } from './logging-nodejs';
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
LogManager.addAppender(new ConsoleNodeAppender());
LogManager.setLevel(LogManager.logLevel.debug);
