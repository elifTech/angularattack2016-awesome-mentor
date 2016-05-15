import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams} from '@angular/router-deprecated';
import {Auth} from 'ng2-ui-auth';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {ProfessionService} from '../../services/profession.service';
import {GoogleService} from '../../services/google.service';
import {AuthService} from '../../services/auth.service';
import {Level} from '../../models/level.model';
import {LevelItem} from '../../models/level-item.model';
import {Profession} from '../../models/profession.model';
import {PublicLevelItem} from '../../models/public-level-item.model';
import {UserModel} from '../../models/user.model';
import {DocumentModel} from '../../models/document.model';


@Component({
    templateUrl: '/views/public/degree.html',
    directives: [
        LoadingContainerComponent,
        CORE_DIRECTIVES
    ],
    providers: [
        ProfessionService,
        GoogleService
    ]
})
export class PublicDegreeController {
    public loading: boolean;
    public level: Level;
    public professionName: string = '';
    public savedCourses: string[] = [];
    public profession: Profession;
    public courses: PublicLevelItem[];
    public googleService: GoogleService;
    public document: DocumentModel = new DocumentModel();

    private user: UserModel;

    private auth: Auth;
    
    constructor(private authService:AuthService, 
                private params:RouteParams, 
                private professionService:ProfessionService,
                private google: GoogleService){

        this.document.id = "";

        this.googleService = google;
        var self = this;
        gapi.load('auth:client,drive-realtime,drive-share', function() {
            google.driveAuth()
                .then(function(response) {
                    self.start();
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        });

        this.auth = AuthService.auth;
        AuthService.user$.subscribe(user => {
            this.user = user;
        });

        this.professionName = decodeURIComponent(params.get('profession'));
        var levelName = decodeURIComponent(params.get('level')) || 'New level';
        this.level = new Level({
            name: levelName
        });
        this.document.name = this.level.name;

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
                    return new LevelItem(item);
                });
                
                this.document.courses = levelItems.map(function (item:any) {
                    return new PublicLevelItem(item);
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
        this.googleService
            .findDocument(this.level.name)
            .then((response:any) => {
                if(!response) return;
                this.document.id = response.id;
                this.document.resource = response.downloadUrl;
                console.log(this.document);
            })
            .catch(error => {
                console.log(error);
            });
    }

    public markAsDone(item:any) {
        this.document.courses[item].checked = !this.document.courses[item].checked;
        this.saveDoc();
    }

    public markAsLater(item:any) {
        this.document.courses[item].starred = !this.document.courses[item].starred;
        this.saveDoc();
    }

    public markAsHidden(item:any) {
        this.document.courses[item].blacklist = !this.document.courses[item].blacklist;
        item.blacklist != item.blacklist;
        this.saveDoc();
    }

    public saveDoc() {
        var service;
        if(this.document.id) {
            service = this.googleService
                .updateDocument(this.document);
        } else {
            service = this.googleService
                .createDocument(this.document);
        }

        service
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}