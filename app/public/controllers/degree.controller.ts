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

        // this.document = new DocumentModel();
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
            .then((response) => {
                //this.document.id = response.id;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    public markAsDone(item:PublicLevelItem) {
        item.checked != item.checked;
        this.saveDoc(item);
    }

    public markAsLater(item:PublicLevelItem) {
        item.starred != item.starred;
        this.saveDoc(item);
        console.log('markAsLater', item);
    }

    public markAsHidden(item:PublicLevelItem) {
        item.blacklist != item.blacklist;
        this.saveDoc(item);
        console.log('markAsHidden', item);
    }

    public saveDoc(item:PublicLevelItem) {
        var documentBody = this.document.courses.map(course => {return course.toJson();}).join(',');
        console.log(documentBody);
        this.googleService
            .createDocument(this.level.name, documentBody)
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}