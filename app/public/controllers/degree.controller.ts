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

    public start() {
        var doc = gapi.drive.realtime.newInMemoryDocument();
        var model = doc.getModel();
        var collaborativeString = model.createString();
        collaborativeString.setText('Welcome to the Quickstart App!');
        model.getRoot().set('demo_string', collaborativeString);
        this.wireTextBoxes(collaborativeString);
        document.getElementById('json_button').addEventListener('click', function(){
            console.log(model.toJson());
            
            //document.getElementById('json_textarea').value = model.toJson();
        });
    }

    // Connects the text boxes to the collaborative string.
    public wireTextBoxes(collaborativeString) {
        var textArea1: any = document.getElementsByTagName('input')[0];
        var textArea2: any = document.getElementsByTagName('input')[1];
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea1);
        gapi.drive.realtime.databinding.bindString(collaborativeString, textArea2);
    }
}