import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: '/views/mentor/login.html',
    directives: [CORE_DIRECTIVES]
})
export class MentorLoginController {
    // public doc: Document;

    constructor(private auth: Auth, private router: Router){
        // this.doc = new Document();
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(() => this.goToMain(), () => {});
    }

    goToMain() {
        this.router.navigate(['Professions']);
    }
}