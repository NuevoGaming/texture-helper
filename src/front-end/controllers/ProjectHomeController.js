import { Component, View, NgZone } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

@Component({
  selector: 'app'
})
@View({
  templateUrl: './partials/project-app.html',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ]
})
class ProjectHomeController {
  constructor(zone: NgZone) {
    this._zone = zone;
    this._name = 'World';

    this._handleEvents();
  }
  _handleEvents() {
  }
}

module.exports = ProjectHomeController;
