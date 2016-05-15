import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams} from '@angular/router-deprecated';

import {ProfessionService} from '../../services/profession.service';
import {Level} from '../../models/level.model';
import {LevelItem} from '../../models/level-item.model';
import {Profession} from '../../models/profession.model';

@Component({
    templateUrl: '/views/public/degree.html',
    directives: [
        CORE_DIRECTIVES
    ],
    providers: [
        ProfessionService
    ]
})
export class PublicDegreeController {
    public loading:boolean;
    public level:Level;
    public professionName:string = '';
    public savedCourses:string[] = [];
    public profession:Profession;

    constructor(private params:RouteParams, private professionService:ProfessionService){
        console.log('PublicDegreeController');

        this.professionName = decodeURIComponent(params.get('profession'));
        var levelName = decodeURIComponent(params.get('level')) || 'New level';
        this.level = new Level({
            name: levelName
        });

        this.loading = true;
        this.professionService
            .getLevelItems(this.professionName, this.level.name)
            .then((levelItems) => {
                this.level.isNew = false;
                console.log('levelItems', levelItems);
                this.savedCourses = levelItems.map((item:any)=> {
                    return item.source;
                });
                this.level.items = levelItems.map(function (item:any) {
                    return new LevelItem(item)
                });
                this.loading = false;
            });

        this.professionService
            .getByName(this.professionName)
            .then((profession) => {
                this.profession = profession;
                // console.log('this.profession', this.profession);
                this.loading = false;
            });
    }
}