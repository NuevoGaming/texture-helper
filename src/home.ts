/// <reference path="../node_modules/angular2/angular2.d.ts" />

import { Component, View } from 'angular2/angular2';
import { Router } from 'angular2/router';

@Component({
    selector: 'home'
})
@View({
    template: '<div>Home</div>'
})
export class Home {
    router: Router;
    constructor(router: Router) {
        this.router = router;
    }
}
