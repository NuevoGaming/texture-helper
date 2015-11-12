import { Component, View } from 'angular2/angular2';
import { Router } from 'angular2/router';

@Component({
    selector: 'home'
})
@View({
    template: '<p>This is home page content</p>'
})
export class Home {
    router: Router;
    constructor(router: Router) {
        this.router = router;
    }
}
