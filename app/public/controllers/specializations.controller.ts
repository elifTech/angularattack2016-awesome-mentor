import {Component} from '@angular/core';
import {CORE_DIRECTIVES, Location} from '@angular/common';
import {ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {GithubService} from '../../services/github.service';
import {ProfessionService} from '../../services/profession.service';
import {GoogleService} from '../../services/google.service';
import {Level} from '../../models/level.model';
import {Profession} from '../../models/profession.model';
import {LevelItem} from '../../models/level-item.model';
import {TetherService} from "../../services/tether.service";

@Component({
    templateUrl: '/views/public/specializations.html',
    directives: [
        LoadingContainerComponent,
        CORE_DIRECTIVES
    ],
    providers: [
        GithubService,
        ProfessionService,
        TetherService
    ]
})
export class PublicSpecializationsController {
    public items:any[];
    public loading:boolean;
    public selectedLevel:Level;
    public professionName:string = '';
    public levelName:string = '';
    public currTag:string = '';
    public currLevelIems:any[];
    public profession:Profession;
    public mentorUser:any;
    public repositoryUrl:string;

    constructor(private github:GithubService, private location:Location,
                private professionService:ProfessionService,
                private params:RouteParams,
                private tether: TetherService,
                private google: GoogleService
    ) {
        this.loading = true;

        this.repositoryUrl = GithubService.publicUrl;
        professionService.getTree((items) => {
            console.log(this.items);
            this.items = items;
            this.loading = false;
        });

        console.log('params', this.params);
        if (this.params.get('specialization')) {
            this.professionName = decodeURIComponent(this.params.get('specialization'));
        }
        if (this.params.get('degree')) {
            this.levelName = decodeURIComponent(this.params.get('degree'));
        }
        if (this.params.get('tag')) {
            this.currTag = decodeURIComponent(this.params.get('tag'));
        }
        this.loadLevelItems();
        github.getRepositoryUser(user => {
            this.mentorUser = user;
        });

        tether.addStep('navbar', {
            text: ['Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its steps.', 'Tether makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'],
            attachTo: '.navbar bottom',
            classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
            buttons: [
                {
                    text: 'Exit',
                    classes: 'shepherd-button-secondary',
                    action: tether.cancel
                }, {
                    text: 'Next',
                    action: tether.next,
                    classes: 'shepherd-button-example-primary'
                }
            ]
        });

        tether.startShepherd();

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
    }

    public start() {
        this.google
            .findDocument(this.levelName)
            .then((response:any) => {
                if(!response) return;

                // this.google
                //     .getDocument(response.id)
                //     .then((response:any) => {
                //             if(!response) return;
                //             console.log(response);
                //         }
                //     );

                // this.document.id = response.id;
                // this.document.resource = response.downloadUrl;
                // console.log(this.document);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    public filterByTag(tag:string) {
        this.currTag = tag;
        if (tag.length > 0) {
            this.location.replaceState('/', '?specialization=' + this.professionName + '&degree=' + this.levelName +
                '&tag=' + this.currTag);
        } else {
            this.location.replaceState('/', '?specialization=' + this.professionName + '&degree=' + this.levelName);
        }
        // this.loadLevelItems();

        this.selectedLevel.items = this.currLevelIems.filter((item:any) => {
            if (this.currTag.length > 0) {
                item.tags = item.tags || [];
                return item.tags.indexOf(this.currTag) != -1;
                // console.log('tag', this.tag, item);
            }
            return true;
        }).map((item:any) => {
            return new LevelItem(item);
        });
    }

    public getLevelItems(professionName:string, levelName:string) {
        this.professionName = professionName;
        this.levelName = levelName;

        this.location.replaceState('/', '?specialization=' + this.professionName + '&degree=' + this.levelName);
        this.loadLevelItems();
    }

    protected loadLevelItems() {
        console.log('getLevelItems', this.professionName, this.levelName);

        if (this.professionName.length > 0 && this.levelName.length > 0) {
            this.professionService
                .getByName(this.professionName)
                .then((profession) => {
                    this.profession = profession;
                    this.loading = false;
                    // console.log('this.profession', this.profession);
                });

            this.selectedLevel = new Level({
                name: this.levelName
            });

            this.loading = true;
            this.professionService
                .getLevelItems(this.professionName, this.levelName)
                .then((levelItems) => {
                    console.log('levelItems', levelItems);
                    this.currLevelIems = levelItems;
                    this.selectedLevel.items = levelItems.filter((item:any) => {
                        if (this.currTag.length > 0) {
                            item.tags = item.tags || [];
                            return item.tags.indexOf(this.currTag) != -1;
                            // console.log('tag', this.tag, item);
                        }
                        return true;
                    }).map((item:any) => {
                        return new LevelItem(item);
                    });
                    this.loading = false;
                });
        }
    }
}