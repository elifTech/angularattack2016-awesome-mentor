import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

import {Profession} from '../../models/profession.model';
import {Level} from '../../models/level.model';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';

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
@CanActivate(AuthService.canComponentActivate)
export class MentorProfessionEditController implements OnInit {
    public profession:Profession;
    private tags:string[] = [''];

    constructor(private params:RouteParams, private professionService: ProfessionService, protected router:Router) {
        console.log('MentorProfessionEditController');
        this.profession = new Profession({});
    }

    ngOnInit() {
        if(this.params.get('name')) {
            this.professionService
                .getByName(this.params.get('name'))
                .then((profession) => {
                    this.profession = profession;
                });
        }
    }

    public saveItem() {
        this.professionService.save(this.profession);
    }

    public addLevel() {
        var newLvl = new Level({});
        newLvl.name = 'Level ' + this.profession.levels.length;
        this.profession.levels.push(newLvl);
        this.professionService.addLevel(this.profession, newLvl);
    }

    public removeLevel(index:number) {
        this.profession.levels.splice(index, 1);
    }

    public setTags($event) {
        this.profession.tags = [];
        $event.forEach(tagObj => {
            if(tagObj.id.length > 0) {
                this.profession.tags.push(tagObj.id);
            }
        });
    }
}