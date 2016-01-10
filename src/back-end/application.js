import electron from 'electron';
const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain;

import WelcomeWindow from './welcome-window';
import ProjectWindow from './project-window';
import ProjectMeta from '../contracts/ProjectMeta';
import Project from './models/project';

class Application {
    constructor() {
      this._welcomeWindow = null;
      this._projectWindows = [];
      this._handleEvents();
    }
    start() {
      this._welcomeWindow = new WelcomeWindow();
      var self = this;

      this._welcomeWindow.beforeClose(function() {
          self._welcomeWindow = null;
          if (self._projectWindows.length == 0) {
            self._close();
          }
      });

      this._welcomeWindow.open();
    }
    _close() {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform in ['win32', 'linux']) {
          app.quit();
          return;
      }
    }
    _addProjectWindow(window) {
      this._projectWindows.push(window);
    }
    _removeProjectWindow(window) {
      this._projectWindows.splice(this._projectWindows.indexOf(window), 1);
      if (this._projectWindows.length == 0) {
          this.start();
      }
    }
    _handleEvents() {
      var self = this;

      ipc.on('application:open-project', function() {
        self._openProject();
      });

      ipc.on('application:get-default-location', function(event) {
        event.returnValue = app.getPath('home'); // todo: get last saved location
      });

      ipc.on('application:select-location', function(event) {
        self._selectLocation(function(path) {
          if (path) {
            event.sender.send('browser:location-selected', path);
          }
        });
      })

      ipc.on('application:create-project', function(event, meta) {
        self._createProject(meta);
      });
    }
    _openProject() {
      dialog.showOpenDialog({
        properties: ['openFile']
      });
    }
    _createProject(meta) {
      var self = this;

      var project = new Project(meta);
      var projectWindow = new ProjectWindow(project);
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
    _selectLocation(callback) {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, function(filenames) {
        if (filenames && filenames.length > 0) {
          callback(filenames[0]);
        } else {
          callback(null);
        }
      });
    }
}

module.exports = Application;
