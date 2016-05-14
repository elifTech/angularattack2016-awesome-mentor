import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {Router} from '@angular/router-deprecated';
import {AuthService} from '../../services/auth.service';

@Component({
    templateUrl: '/views/mentor/login.html',
    directives: [CORE_DIRECTIVES]
})
export class MentorLoginController {
    constructor(private auth: Auth, private authService: AuthService, private router: Router){
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe((res) => {
                AuthService.setProvider(provider);
                this.authService.loadUserInfo();
                this.goToMain();
            });
    }

    goToMain() {
        this.router.navigate([AuthService.provider == 'github' ? 'MentorProfessions' : 'Public']);
    }
}