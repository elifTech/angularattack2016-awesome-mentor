import {
    Component
} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Document} from '../models/document.model';
@Component({
    selector: 'as-professions',
    templateUrl: '/views/mentor/professions.html',
    directives: [CORE_DIRECTIVES]
})
export class ProfessionsController {
    public doc: Document;
    public list: Document[];
    
    constructor(){
        this.doc = new Document('default');
        this.list = [this.doc];
    }
    
}