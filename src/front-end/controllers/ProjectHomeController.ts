/// <reference path="../../../manual-typings/electron-renderer.d.ts"/>

import { Component, View, NgZone, CORE_DIRECTIVES, FORM_DIRECTIVES  } from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  templateUrl: '../public/partials/project-app.html',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
export class ProjectHomeController {
  public name: string;
  constructor(public zone: NgZone) {
    this.name = 'World';

    this.handleEvents();
  }
  private handleEvents(): void {
  }
}
