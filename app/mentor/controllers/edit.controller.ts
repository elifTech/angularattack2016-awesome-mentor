import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES
    ]
})
export class ProfessionEditController {
    public profession:any = {};

    constructor() {
        console.log('ProfessionEditController')
    }
}