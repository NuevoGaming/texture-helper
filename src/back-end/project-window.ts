/// <reference path="../../manual-typings/electron-main.d.ts" />

import BrowserWindow = require('browser-window');

class ProjectWindow {
    private _closeCallback: () => void;
    constructor() {
    }
    public open() {
        var window = new BrowserWindow({
          width: 800,
          height: 600
        }), self = this;

        //window.maximize();
        window.loadURL('file://' + __dirname + '/../front-end/public/views/project.html');
        window.webContents.openDevTools();
        //window.show();

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
