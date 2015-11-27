/// <reference path="../../typings/tsd.d.ts" />

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
        this.handleEvents();
    }
    public start() {
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
    private handleEvents() {
      var self = this;

      ipc.on('application:open-project', function() {
        self.openProject();
      });


    }
    private openProject() {
      dialog.showOpenDialog({
        properties: ['openFile']
      });
    }
}

export = Application
