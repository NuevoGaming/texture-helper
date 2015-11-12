import { Component, View } from 'angular2/angular2';
import { RouteConfig, Router, RouterLink, RouterOutlet } from 'angular2/router';

import { Home } from './home';

@Component({
    selector: 'app'
})
@View({
    templateUrl: '../static/partials/app.html',
    directives: [ RouterLink, RouterOutlet ]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home' }
])
export class App {
    name: string;
    constructor() {
        this.name = 'World';
    }
}