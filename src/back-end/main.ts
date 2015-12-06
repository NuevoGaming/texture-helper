/// <reference path="../../typings/node/node.d.ts" />

// save start time
var shellStartTime = Date.now();

var app = require('app');  // Module to control application life.
var crashReporter = require('crash-reporter');

// Report crashes to our server.
crashReporter.start();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    let Application = require('./application');

    let app = new Application();
    app.start();

    console.log('App load time: ' + (Date.now() - shellStartTime) + 'ms');
});
