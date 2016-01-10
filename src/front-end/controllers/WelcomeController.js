import { Component, View, NgZone } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import ProjectMeta from '../../contracts/ProjectMeta';

import electron from 'electron';
const ipc = electron.ipcRenderer;

const WindowState = {
  NewProject: 1,
  ProjectTypeAppearance: 2,
  ProjectType: 3,
  NewProjectPageAppearance: 4
}

const animationTimeout = 980;

class FrameworkViewModel {
  constructor(name, code) {
    this.selected = false;
    this.name = name;
    this.code = code
  }
}

class NewProjectViewModel {
  constructor() {
    this.name = null;
    this.location = null;
  }
}

@Component({
  selector: 'app'
})
@View({
  templateUrl: './partials/welcome-app.html',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
class WelcomeController {
    constructor(zone: NgZone) {
      this.zone = zone;
      this.state = WindowState.NewProject;
      this.frameworks = [];
      this.newProject = new NewProjectViewModel();
      this.selectedFramework = null;

      this._handleEvents();
      this._getDefaultLocation();
      this._loadFrameworks();
      this.selectFramework(this.frameworks[0]);

      this._logVersions();
    }
    openProject() {
      ipc.send('application:open-project');
    }
    showProjectTypeSelector() {
      var self = this;
      this.state = WindowState.ProjectTypeAppearance;
      setTimeout(() => self.zone.run(() => {
        self.state = WindowState.ProjectType;
      }), animationTimeout);
    }
    back() {
      var self = this;
      this.state = WindowState.NewProjectPageAppearance;
      setTimeout(() => self.zone.run(() => {
        self.state = WindowState.NewProject;
      }), animationTimeout);
    }
    createNewProject() {
      var meta = new ProjectMeta();
      meta.Name = this.newProject.name;
      meta.FrameworkCode = this.selectedFramework.code;
      meta.Location = this.newProject.location;
      ipc.send('application:create-project', meta);
    }
    selectFramework(framework) {
      if (this.selectedFramework !== framework) {
        if (this.selectedFramework) {
          this.selectedFramework.selected = false;
        }
        this.selectedFramework = framework;
        this.selectedFramework.selected = true;
      }
    }
    selectLocation() {
      ipc.send('application:select-location', this.newProject.location);
    }
    _handleEvents() {
      var self = this;
      ipc.on('browser:location-selected', function(location) {
        self.zone.run(() => {
          self.newProject.location = location;
        });
      });
    }
    _getDefaultLocation() {
      this.newProject.location = ipc.sendSync('application:get-default-location');
    }
    _loadFrameworks() {
      this.frameworks.push(new FrameworkViewModel('Cocos2d', 'cocos2d'));
    }
    _logVersions() {
      var message = 'We are using node ' + process.versions.node +
        ', Chrome ' + process.versions.chrome +
        ', and Electron ' + process.versions.electron;
      console.log(message);
    }
}

module.exports = WelcomeController;
