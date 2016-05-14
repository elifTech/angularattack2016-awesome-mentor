import {Component} from '@angular/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {APP_ROUTES} from './app.routes';
import {LoggerService} from './services/logger.service';

@Component({
    selector: 'as-main-app',
    templateUrl: '/views/app.html',
    directives: [
        RouterOutlet,
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }
}
