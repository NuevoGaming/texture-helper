/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../manual-typings/electron-main.d.ts" />

import app = require('app');
import electron = require('electron');
import dialog = require('dialog');

import WelcomeWindow = require("./welcome-window");
import ProjectWindow = require("./project-window");
import ProjectMeta from '../contracts/ProjectMeta';

var ipc = electron.ipcMain;

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
            if (self._projectWindows.length == 0) {
              self.close();
            }
        });

        this._welcomeWindow = welcomeWindow;
        this._welcomeWindow.open();
    }
    private close() {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform in ['win32', 'linux']) {
          app.quit();
          return;
      }
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

      ipc.on('application:get-default-location', function(event: any) {
        event.returnValue = app.getPath('home'); // todo: get last saved location
      });

      ipc.on('application:select-location', function(event: any) {
        self.selectLocation(function(path) {
          if (path) {
            event.sender.send('browser:location-selected', path);
          }
        });
      })

      ipc.on('application:create-project', function(event: any, meta: ProjectMeta) {
        self.createProject(meta);
      });
    }
    private openProject() {
      dialog.showOpenDialog({
        properties: ['openFile']
      });
    }
    private createProject(meta: ProjectMeta) {
      var self = this,
          projectWindow = new ProjectWindow();
      projectWindow.beforeClose(function() {
        var index = self._projectWindows.indexOf(this);
        if (index > -1) {
          self._projectWindows.splice(index, 1);
        }
      });
      this._projectWindows.push(projectWindow);
      if (this._welcomeWindow) {
        this._welcomeWindow.close();
      }
      projectWindow.open();
    }
    private selectLocation(callback: (path:string) => void) {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, function(filenames: string[]) {
        if (filenames && filenames.length > 0) {
          callback(filenames[0]);
        } else {
          callback(null);
        }
      });
    }
}

export = Application
