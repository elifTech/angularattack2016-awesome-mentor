import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {GithubService} from '../../services/github.service';

@Component({
    templateUrl: '/views/public/degree.html',
    directives: [
        CORE_DIRECTIVES
    ],
    providers: [
        GithubService
    ]
})
export class PublicDegreeController {
    constructor(){
        console.log('PublicDegreeController');
    }
}