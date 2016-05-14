import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

import {ProfessionService} from '../../services/profession.service';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        SELECT_DIRECTIVES
    ],
    providers: [
        ProfessionService
    ]
})
export class MentorProfessionEditController {
    public profession:any = {
        levels: []
    };
    private tags:string[] = [''];

    constructor(private params:RouteParams, private professionService: ProfessionService, protected router:Router) {
        console.log('MentorProfessionEditController');
        this.professionService
            .getByName(params.get('name'))
            .then((profession) => {
                this.profession = profession;
            });
    }

    public saveItem() {

    }


    public addLevel() {
        this.profession.levels.push({title: 'Level #' + this.profession.levels.length});
    }

    public removeLevel(index:number) {
        this.profession.levels.splice(index, 1);
    }

    public setTags($event) {
        this.profession.tags = [];
        $event.forEach(tagObj => {
            this.profession.tags.push(tagObj.id);
        });
    }
}