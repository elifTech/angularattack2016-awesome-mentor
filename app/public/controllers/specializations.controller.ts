import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {GithubService} from '../../services/github.service';

@Component({
    templateUrl: '/views/about.html',
    directives: [CORE_DIRECTIVES],
    providers: [
        GithubService
    ]
})
export class PublicSpecializationsController {
    constructor(private github: GithubService){

        github.getCurrentRepository().getTree(res => {
            console.info(res)
        });
        
    }
}