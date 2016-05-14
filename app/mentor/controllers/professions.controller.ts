import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from '@angular/router-deprecated';
import {Profession} from '../../models/profession.model';
import {ProfessionService} from '../../services/profession.service';
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
    public errorMessage: string;

    constructor(private professionService: ProfessionService){
        this.professionService.list()
            .subscribe(
                docs => this.docs = docs,
                error =>  this.errorMessage = <any>error);
    }
    
}