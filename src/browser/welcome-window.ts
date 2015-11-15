/// <reference path="../../typings/tsd.d.ts" />

var BrowserWindow = require('browser-window');  // Module to create native browser window.

class WelcomeWindow {
    private _closeCallback: () => void;
    constructor() {
    }
    public open() {
        // Create the browser window.
        var window = new BrowserWindow({
            width: 777,
            height: 460,
            resizable: false
        }), self = this;

        // and load the index.html of the app.
        window.loadUrl('file://' + __dirname + '/../static/welcome.html');

        // Open the DevTools.
        window.webContents.openDevTools();

        // Emitted when the window is closed.
        window.on('closed', function() {
            self.handleClose();
        });
    }
    public beforeClose(handler: () => void) {
        this._closeCallback = handler;
    }
    private handleClose()
    {
        if (this._closeCallback != null) {
            this._closeCallback.call(this);
        }
    }
}

export = WelcomeWindow
