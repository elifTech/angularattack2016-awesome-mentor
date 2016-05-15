import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams} from '@angular/router-deprecated';
import {Auth} from 'ng2-ui-auth';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import {UserModel} from "../../models/user.model";
import {Level} from '../../models/level.model';
import {LevelItem} from '../../models/level-item.model';
import {Profession} from '../../models/profession.model';

@Component({
    templateUrl: '/views/public/degree.html',
    directives: [
        LoadingContainerComponent,
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

    private user: UserModel;

    private auth: Auth;
    
    constructor(private authService:AuthService, 
                private params:RouteParams, 
                private professionService:ProfessionService){
        
        console.log('PublicDegreeController');
    constructor(private params:RouteParams, private professionService:ProfessionService){
        gapi.load('auth:client,drive-realtime,drive-share', this.start);
        

        this.auth = AuthService.auth;
        AuthService.user$.subscribe(user => {
            this.user = user;
        });

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
                // this.loading = false;
            });


    }

    public start() {
        var doc = gapi.drive.realtime.newInMemoryDocument();
        console.log(doc);
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

    public markAsDone(item:LevelItem) {
        console.log('markAsDone', item);
    }

    public markAsLater(item:LevelItem) {
        console.log('markAsLater', item);
    }

    public markAsHidden(item:LevelItem) {
        console.log('markAsHidden', item);
    }
}