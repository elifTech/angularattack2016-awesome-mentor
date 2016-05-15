import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

import {Profession} from '../../models/profession.model';
import {Level} from '../../models/level.model';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import {LoadingContainerComponent} from '../../components/loading-container.component';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        LoadingContainerComponent,
        SELECT_DIRECTIVES
    ],
    providers: [
        ProfessionService
    ]
})
@CanActivate(AuthService.canComponentActivate)
export class MentorProfessionEditController implements OnInit {
    public profession:Profession;
    public loading:boolean;
    private tags:string[] = [''];

    constructor(private params:RouteParams, private professionService: ProfessionService, protected router:Router) {
        console.log('MentorProfessionEditController');
        this.profession = new Profession({});
        this.profession.isNew = true;
    }

    ngOnInit() {
        if(this.params.get('name')) {
            this.loading = true;
            this.professionService
                .getByName(this.params.get('name'))
                .then((profession) => {
                    this.profession = profession;
                    this.loading = false;
                });
        }
    }

    public saveItem() {
        this.professionService.save(this.profession);
    }

    public onLevelNameChanged(index:number, name:string) {
        if(!this.profession.levels[index].isNew) {
            this.profession.levels[index].isRenamed = true;
        }
        this.profession.levels[index].name = name;
    }

    public addLevel() {
        var newLvl = new Level({});
        newLvl.isNew = true;
        newLvl.name = 'Level ' + this.profession.levels.length;
        this.profession.levels.push(newLvl);
    }

    public removeLevel(index:number) {
        this.profession.levels[index].isDeleted = true;
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