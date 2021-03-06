import 'reflect-metadata';
import 'rxjs';
import 'zone.js';

import { bootstrap } from 'angular2/platform/browser';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import ProjectHomeController from './controllers/ProjectHomeController';

// angular2 issue 6007
window.Zone = window.zone;

bootstrap(ProjectHomeController, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);
