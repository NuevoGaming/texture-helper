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
    zone: NgZone;
    public name: string;
    public location: string;
    public frameworks: FrameworkViewModel[];
    constructor(zone: NgZone) {
      this.state = WindowState.NewProject;
      this.zone = zone;

      this.frameworks = [];
      this.loadFrameworks();
      this.frameworks[0].selected = true;
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
      console.log('select ' + framework.code);
    }
    private loadFrameworks(): void {
      this.frameworks.push(new FrameworkViewModel('Cocos2d', 'cocos2d'));
    }
}
