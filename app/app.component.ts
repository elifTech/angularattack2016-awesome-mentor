import {Component} from '@angular/core';
import {RouterOutlet, RouteConfig, RouteDefinition, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {APP_ROUTES} from './app.routes';
import {NavbarComponent} from './navbar/navbar.component';
import {LoggerService} from './services/logger.service';

@Component({
    selector: 'as-main-app',
    templateUrl: '/views/app.html',
    directives: [RouterOutlet, ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    public appRoutes: RouteDefinition[];
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this.appRoutes = APP_ROUTES;
    }
}
