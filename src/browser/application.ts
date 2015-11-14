/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../manual_typings/electron.d.ts" />

import WelcomeWindow = require("./welcome-window");
import ProjectWindow = require("./project-window");
import ipc = require('ipc');
import dialog = require('dialog');

var app = require('app');

class Application {
    private _welcomeWindow: WelcomeWindow;
    private _projectWindows: ProjectWindow[];
    constructor() {
        this._projectWindows = [];
    }
    public start() {
        ipc.on('showOpenProjectDialog', function() {
          dialog.showOpenDialog({
            properties: ['openFile']
          });
        });

        var welcomeWindow = new WelcomeWindow(),
            self = this;

        welcomeWindow.beforeClose(function() {
            self._welcomeWindow = null;
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform in ['win32', 'linux']) {
                app.quit();
                return;
            }
        });

        this._welcomeWindow = welcomeWindow;
        this._welcomeWindow.open();
    }
    private addProjectWindow(window: ProjectWindow) {
        this._projectWindows.push(window);
    }
    private removeProjectWindow(window: ProjectWindow) {
        this._projectWindows.splice(this._projectWindows.indexOf(window), 1);
        if (this._projectWindows.length == 0) {
            this.start();
            return;
        }
    }
}

export = Application
