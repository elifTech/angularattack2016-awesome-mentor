import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Profession} from '../../models/profession.model';
@Component({
    templateUrl: '/views/mentor/professions.html',
    directives: [CORE_DIRECTIVES]
})
export class MentorProfessionsController {
    public doc: Profession;
    public list: Profession[];
    
    constructor(){
        this.doc = new Profession('default');
        this.list = [this.doc];
    }
    
}