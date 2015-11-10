/// <reference path="../node_modules/angular2/angular2.d.ts" />

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
    { path: '', as: 'home', component: Home },
])
export class App {
    name: string;
    constructor() {
        this.name = 'World';
    }
}