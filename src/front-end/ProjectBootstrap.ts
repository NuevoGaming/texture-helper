import 'zone.js';
import 'reflect-metadata';

import { bootstrap, FORM_PROVIDERS } from 'angular2/angular2';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { ProjectHomeController } from './controllers/ProjectHomeController';

bootstrap(ProjectHomeController, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);
