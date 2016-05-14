import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Profession} from '../../models/profession.model';
import {ProfessionService} from '../../services/profession.service';
import 'rxjs/Rx';
@Component({
    templateUrl: '/views/mentor/professions.html',
    directives: [
        CORE_DIRECTIVES,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ProfessionService
    ]
})
export class MentorProfessionsController {
    public doc: Profession;
    public docs: Profession[];
    public errorMessage: string;

    constructor(private professionService: ProfessionService){
        console.log('MentorProfessionsController');

        this.professionService
            .list()
            .then((docs) => {
                this.docs = docs;
            });
    }
    
}