import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {Router} from '@angular/router-deprecated';
import {GithubService, Repository} from '../../services/github.service';

@Component({
    templateUrl: '/views/mentor/login.html',
    directives: [CORE_DIRECTIVES]
})
export class MentorLoginController {
    public repos: Repository;

    constructor(private auth: Auth, private router: Router, private github: GithubService){
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

    save() {
        this.repos = this.github.getRepository('esvit', 'test-repos');
        this.repos.readFiles((res) => {
            res[0].setContent('test', 'test message', res => {
                console.info(res);
            });
        });
    }
}