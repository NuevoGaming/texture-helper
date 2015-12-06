import { bootstrap, FORM_PROVIDERS } from 'angular2/angular2';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { ProjectRouter } from './routers/ProjectRouter';

bootstrap(ProjectRouter, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);
