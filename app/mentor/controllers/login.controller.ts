import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Auth} from 'ng2-ui-auth';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GithubService, Repository} from '../../services/github.service';

@Component({
    templateUrl: '/views/mentor/login.html',
    providers: [GithubService],
    directives: [CORE_DIRECTIVES]
})
export class MentorLoginController {
    public repos: Repository;

    constructor(private auth: Auth, private router: Router, private github: GithubService){
        this.repos = github.getRepository('esvit', 'test-repos');

        github.fromMarkdown('Hello world github/linguist#1 **cool**, and #1!', function(res) {
            console.info(res);
        });

        /*this.repos.readFiles((res) => {
            res[0].setContent('test', 'test message', res => {
                console.info(res);
            });
            res[0].getContent(res => {
                console.info(res);
            })
        });*/
    }

    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe((res) => {

                console.info(res)

            }, () => {});
    }

    goToMain() {
        this.router.navigate(['Professions']);
    }
}