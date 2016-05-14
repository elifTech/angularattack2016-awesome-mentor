import {Component} from '@angular/core';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {APP_ROUTES} from './app.routes';
import {LoggerService} from './services/logger.service';
import {AuthService} from './services/auth.service';
import {Auth} from 'ng2-ui-auth';
import {GithubService} from "./services/github.service";

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

    private user: any;

    constructor(logger: LoggerService, private auth:Auth, private router: Router, private github: GithubService) {
        this.logger = logger;
        //console.log('AppComponent constructor', this.auth.isAuthenticated());
        AuthService.$auth = this.auth;

        if (this.auth.isAuthenticated()) {
            this.github.getUser(user => {
                this.user = user;
                console.info(user)
            });
        }
    }

    logout() {
        this.auth.logout().subscribe(() => this.goToMain());
    }

    goToMain() {
        this.router.navigate(['MentorLogin']);
    }
}
