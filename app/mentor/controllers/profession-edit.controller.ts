import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from '@angular/router-deprecated';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES
    ]
})
export class MentorProfessionEditController {
    public profession:any = {};

    constructor(protected router:Router) {
        console.log('MentorProfessionEditController')
    }

    public saveItem()
    {}
}