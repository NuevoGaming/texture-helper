/// <reference path="../../manual-typings/electron-main.d.ts" />

import BrowserWindow = require('browser-window');

class WelcomeWindow {
    private _closeCallback: () => void;
    private _window: Electron.BrowserWindow;
    constructor() {
    }
    public open() {
        var window = new BrowserWindow({
            width: 777,
            height: 460,
            resizable: false
        }), self = this;

        window.loadURL('file://' + __dirname + '/../front-end/public/views/welcome.html');
        window.webContents.openDevTools();

        window.on('closed', function() {
            self.handleClose();
        });

        this._window = window;
    }
    public close() {
      this._window.close();
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
