import path from 'path';
import electron from 'electron';
let BrowserWindow = electron.BrowserWindow;

class WelcomeWindow {
    constructor() {
      this._window = null;
      this._closeCallback = null;
    }
    open() {
      var window = new BrowserWindow({
          width: 777,
          height: 460,
          resizable: false
      }), self = this;

      window.loadURL('file://' + __dirname + '/../front-end/public/views/welcome.html');
      window.webContents.openDevTools();

      window.on('closed', function() {
          self._handleClose.call(self);
      });

      this._window = window;
    }
    close() {
      this._window.close();
    }
    beforeClose(handler) {
        this._closeCallback = handler;
    }
    _handleClose() {
      if (this._closeCallback != null) {
          this._closeCallback.call(this);
      }
    }
}

module.exports = WelcomeWindow;
