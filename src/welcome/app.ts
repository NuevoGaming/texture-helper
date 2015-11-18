/// <reference path="../../manual_typings/electron.d.ts"/>

import { Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';
import ipc = require('ipc');

enum WindowState {
  NewProject = 1,
  ProjectType = 2
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
    constructor() {
      this.state = WindowState.NewProject;
    }
    showOpenProjectDialog() {
      ipc.send('showOpenProjectDialog');
    }
    showProjectTypeSelector() {
      this.state = WindowState.ProjectType;
    }
}
