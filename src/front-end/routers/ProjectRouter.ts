import { Component, View } from 'angular2/angular2';
import { RouteConfig, Router, RouterLink, RouterOutlet } from 'angular2/router';

import { ProjectHomeController } from '../controllers/ProjectHomeController';

@Component({
    selector: 'app'
})
@View({
    templateUrl: '../public/partials/project-app.html',
    directives: [ RouterLink, RouterOutlet ]
})
@RouteConfig([
    { path: '/', component: ProjectHomeController, as: 'Home' }
])
export class ProjectRouter {
    name: string;
    constructor() {
        this.name = 'World';
    }
}
