/// <reference path="../../manual_typings/electron.d.ts"/>

import { Component, View, NgClass } from 'angular2/angular2';
import ipc = require('ipc');

enum WindowState {
  NewProject = 1,
  ProjectType = 2
};

@Component({
    selector: 'app'
})
@View({
    templateUrl: '../static/partials/welcome-app.html',
    directives: [ NgClass ]
})
export class App {
    public state: WindowState;
    constructor() {
      this.state = WindowState.NewProject;
    }
    showOpenProjectDialog() {
      console.log('showOpenProjectDialog');
      ipc.send('showOpenProjectDialog');
    }
    showProjectTypeSelector() {
      this.state = WindowState.ProjectType
    }
}
