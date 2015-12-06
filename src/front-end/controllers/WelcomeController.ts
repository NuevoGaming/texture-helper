/// <reference path="../../../manual-typings/electron-renderer.d.ts"/>

import { Component, View, NgZone, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';

import ProjectMeta from '../../contracts/ProjectMeta';

import electron = require('electron');
var ipc = electron.ipcRenderer;

enum WindowState {
  NewProject = 1,
  ProjectTypeAppearance = 2,
  ProjectType = 3,
  NewProjectPageAppearance = 4
}

const animationTimeout: number = 980;

class FrameworkViewModel {
  public selected: boolean;
  constructor(public name: string, public code: string) {
  }
}

class NewProjectViewModel {
  public name: string;
  public location: string;
}

@Component({
    selector: 'app'
})
@View({
    templateUrl: '../public/partials/welcome-app.html',
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class WelcomeController {
    state: WindowState;
    selectedFramework: FrameworkViewModel;
    newProject: NewProjectViewModel;
    frameworks: FrameworkViewModel[];
    constructor(public zone: NgZone) {
      this.state = WindowState.NewProject;
      this.frameworks = [];
      this.newProject = new NewProjectViewModel();

      this.handleEvents();
      this.getDefaultLocation();
      this.loadFrameworks();
      this.selectFramework(this.frameworks[0]);
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
    createNewProject(): void {
      var meta = new ProjectMeta();
      meta.Name = this.newProject.name;
      meta.FrameworkCode = this.selectedFramework.code;
      meta.Location = this.newProject.location;
      ipc.send('application:create-project', meta);
    }
    selectFramework(framework: FrameworkViewModel): void {
      if (this.selectedFramework !== framework) {
        if (this.selectedFramework) {
          this.selectedFramework.selected = false;
        }
        this.selectedFramework = framework;
        this.selectedFramework.selected = true;
      }
    }
    selectLocation(): void {
      ipc.send('application:select-location', this.newProject.location);
    }
    private handleEvents(): void {
      var self = this;
      ipc.on('browser:location-selected', function(location: string) {
        self.zone.run(() => {
          self.newProject.location = location;
        });
      });
    }
    private getDefaultLocation(): void {
      this.newProject.location = ipc.sendSync('application:get-default-location');
    }
    private loadFrameworks(): void {
      this.frameworks.push(new FrameworkViewModel('Cocos2d', 'cocos2d'));
    }
}
