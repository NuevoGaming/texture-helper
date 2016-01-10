// save start time
var shellStartTime = Date.now();

var electron = require('electron');
const app = electron.app;
//const crashReporter: GitHubElectron.CrashReporter = electron.CrashReporter;

// Report crashes to our server.
//crashReporter.start();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    let Application = require('./application');

    let app = new Application();
    app.start();

    console.log('App load time: ' + (Date.now() - shellStartTime) + 'ms');
});
