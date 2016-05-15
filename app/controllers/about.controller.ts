import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
    templateUrl: '/views/about.html',
    directives: [CORE_DIRECTIVES]
})
export class AboutController {
    constructor(){
    }
}