import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';
import {Profession} from '../../models/profession.model';
@Component({
    templateUrl: '/views/mentor/professions.html',
    directives: [
        CORE_DIRECTIVES,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})
export class MentorProfessionsController {
    public doc: Profession;
    public docs: Profession[];

    constructor(){
        this.doc = new Profession('default');
        let doc2 = new Profession('second');
        this.docs = [this.doc, doc2];
    }
    
}