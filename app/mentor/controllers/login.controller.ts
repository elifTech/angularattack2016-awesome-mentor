import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {Router} from '@angular/router-deprecated';

@Component({
    templateUrl: '/views/mentor/login.html',
    directives: [CORE_DIRECTIVES]
})
export class MentorLoginController {
    constructor(private auth: Auth, private router: Router){
        if (this.auth.isAuthenticated()) {
            this.goToMain();
        }
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe((res) => this.goToMain());
    }

    goToMain() {
        this.router.navigate(['MentorProfessions']);
    }
}