import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

@Component({
    templateUrl: 'views/mentor/profession-content.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        SELECT_DIRECTIVES
    ]
})
export class MentorProfessionContentController {
    public profession:any = {};
    public queryString:string = '';

    constructor(protected router:Router) {
        console.log('MentorProfessionContentController')
    }

    public saveItem()
    {

    }
}