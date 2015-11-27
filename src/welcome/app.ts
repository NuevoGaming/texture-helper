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
    constructor(zone: NgZone) {
      this.state = WindowState.NewProject;
      this.zone = zone;
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
}
