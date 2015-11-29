/// <reference path="../../manual_typings/electron.d.ts"/>

import { Component, View, NgZone, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';
import ipc = require('ipc');

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

@Component({
    selector: 'app'
})
@View({
    templateUrl: '../static/partials/welcome-app.html',
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class App {
    state: WindowState;
    selectedFramework: FrameworkViewModel;
    public name: string;
    public location: string;
    public frameworks: FrameworkViewModel[];
    constructor(public zone: NgZone) {
      this.state = WindowState.NewProject;
      this.frameworks = [];

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
      console.log('create');
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
      ipc.send('application:select-location', this.location);
    }
    private handleEvents(): void {
      var self = this;
      ipc.on('browser:location-selected', function(location) {
        self.zone.run(() => {
          self.location = location;
        });
      })
    }
    private getDefaultLocation(): void {
      this.location = ipc.sendSync('application:get-default-location');
    }
    private loadFrameworks(): void {
      this.frameworks.push(new FrameworkViewModel('Cocos2d', 'cocos2d'));
    }
}
