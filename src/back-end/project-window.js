import path from 'path';
import electron from 'electron';
let BrowserWindow = electron.BrowserWindow;

import Project from './models/project';

class ProjectWindow {
    constructor(project) {
      this._project = project;
      this._closeCallback = null;
    }
    open() {
      var window = new BrowserWindow({
        width: 1024,
        height: 600,
        title: this._project.Name + ' - TextureHelper'
      }), self = this;

      //window.maximize();
      window.loadURL('file://' + __dirname + '/../front-end/public/views/project.html');
      window.webContents.openDevTools();
      //window.show();

      window.on('closed', function() {
          self._handleClose();
      });
    }
    beforeClose(handler) {
      this._closeCallback = handler;
    }
    _handleClose()
    {
        if (this._closeCallback != null) {
            this._closeCallback.call(this);
        }
    }
}

module.exports = ProjectWindow;
