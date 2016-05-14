import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        SELECT_DIRECTIVES
    ]
})
export class MentorProfessionEditController {
    public profession:any = {
        levels: []
    };
    private tags:string[] = [''];

    constructor(protected router:Router) {
        console.log('MentorProfessionEditController')
    }

    public saveItem() {

    }


    public addLevel() {
        this.profession.levels.push('Level #' + this.profession.levels.length);
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