/// <reference path="../../typings/tsd.d.ts" />

var app = require('app');
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// interface for Electron browser window
interface IBrowserWindow {
    loadUrl(url: string): void;
    webContents: IWebContents;
    on(eventName: string, handler: () => void): void;
}

interface IWebContents {
    openDevTools(): void;
}

class HelperApplication {
    private _windows: IBrowserWindow[];
    constructor() {
        this._windows = [];
    }
    open() {
        // Create the browser window.
        var window = new BrowserWindow({width: 800, height: 600}),
            self = this;

        // and load the index.html of the app.
        window.loadUrl('file://' + __dirname + '/../../static/index.html');

        // Open the DevTools.
        window.webContents.openDevTools();

        // Emitted when the window is closed.
        window.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            self.removeWindow(window);
        });

        this.addWindow(window);
    }
    addWindow(window: IBrowserWindow) {
        this._windows.push(window);
    }
    removeWindow(window: IBrowserWindow) {
        if (this._windows.length == 1) {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform in ['win32', 'linux']) {
                app.quit();
                return;
            }
        }
        this._windows.splice(this._windows.indexOf(window), 1);
    }
}

module.exports = new HelperApplication();