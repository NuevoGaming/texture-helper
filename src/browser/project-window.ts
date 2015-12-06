/// <reference path="../../manual-typings/electron-main.d.ts" />

import BrowserWindow = require('browser-window');  // Module to create native browser window.

class ProjectWindow {
    private _closeCallback: () => void;
    constructor() {
    }
    public open() {
        // Create the browser window.
        var window = new BrowserWindow({width: 800, height: 600}),
            self = this;

        // and load the index.html of the app.
        window.loadURL('file://' + __dirname + '/../static/project.html');

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

export = ProjectWindow
