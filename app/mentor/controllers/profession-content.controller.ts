import {Component} from '@angular/core';
import {CORE_DIRECTIVES, Location, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';
import {MODAL_DIRECTIVES} from 'ng2-bs3-modal/ng2-bs3-modal';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {CourseraService} from '../../services/coursera.service';
import {YouTubeService} from '../../services/youtube.service';
import {AwesomeService} from '../../services/awesome.service';

import {FORM_PROVIDERS, FormBuilder, Validators} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import {GithubService} from '../../services/github.service';
import {ToastrService} from '../../services/toastr.service';
import {Level} from '../../models/level.model';
import {UserModel} from '../../models/user.model';
import {Profession} from '../../models/profession.model';

import {groupBy, find, filter, remove} from 'lodash';
import {LevelItem} from "../../models/level-item.model";

@Component({
    templateUrl: 'views/mentor/profession-content.html',
    directives: [
        MODAL_DIRECTIVES,
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        LoadingContainerComponent,
        SELECT_DIRECTIVES
    ],
    providers: [
        FORM_PROVIDERS,
        ProfessionService,
        CourseraService,
        YouTubeService,
        AwesomeService
    ]
})
@CanActivate(AuthService.canComponentActivate)
export class MentorProfessionContentController {
    public level:Level;

    public currTabIndex:number = 1;

    public currItemIndex:number;

    public professionName:string = '';

    public profession:Profession;

    public queryString:string = '';

    public savedCourses:string[] = [];

    youTubeResults:any[];
    courseraResults:any[];
    awesomeResults:any[];
    public form:any;
    public loading:boolean;

    private user: UserModel;

    constructor(protected router:Router, private _courseraService:CourseraService,
                private _youTubeService:YouTubeService,
                private githubService:GithubService,
                private professionService:ProfessionService,
                private toastr: ToastrService,
                private params:RouteParams, private location:Location, private authService:AuthService,
                private _awesomeService:AwesomeService, private fb:FormBuilder) {


        this.form = fb.group({
            queryStringInput: ['', Validators.required],
            name: ['', Validators.pattern('[A-Za-z0-9\-\_\\s]+')]
        });

        this.form.controls.queryStringInput.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
                this.makeAllRequests();
            });


        this.professionName = decodeURIComponent(params.get('name'));
        var levelName = decodeURIComponent(params.get('level')) || 'New level';
        this.level = new Level({
            name: levelName
        });
        this.level.isNew = true;

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
                this.loading = false;
                console.log('this.profession', this.profession);
            });

        this.user = this.authService.getUser();
        AuthService.user$.subscribe(user => {
            this.user = user;
        });
    }

    public setTab(index) {
        this.currTabIndex = index;
    }

    // helpers start

    protected makeAllRequests() {
        this.searchYoutube();
        this.searchCoursera();
        this.searchAwesome();
    }

    // youtube
    protected searchYoutube() {
        if (this.queryString.length <= 1) return;
        this._youTubeService.search(this.queryString, this.savedCourses.length).then(res => {
            console.log(res.json().items);
            this.youTubeResults = this.youtubeFilter(res.json().items);
        });
    }

    protected searchCoursera() {
        if (this.queryString.length <= 1) return;
        this._courseraService.search(this.queryString).then(res => {
            this.courseraResults = this.courseraFilter(res);
        });
    }

    protected searchAwesome() {
        if (this.queryString.length <= 1) return;
        this._awesomeService.search(this.queryString).then(res => {
            this.awesomeResults = this.awesomeFilter(res);
        });
    }

    protected youtubeFilter(items) {
        return items.filter((result:any) => {
            return this.savedCourses.indexOf("https://www.youtube.com/watch?v=" + result.id.videoId) === -1;
        });
    }

    protected courseraFilter(items) {
        return items.filter((result:any) => {return this.savedCourses.indexOf('https://www.coursera.org/learn/' + result.slug) === -1;});
    }    
    
    protected awesomeFilter(items) {
        return items.filter((result:any) => {
            return this.savedCourses.indexOf(result.href) === -1;
        });
    }

    // helpers end

    public saveItem() {
        this.loading = true;
        if (this.level.isRenamed) {
            this.professionService.saveLevel(this.professionName, this.level)
            .then(() => {
                return this.professionService.removeLevel(this.professionName, this.level.oldName);
            }).then(() => {
                this.loading = false;
                // console.log('SAVED2222');
                this.toastr.success('Degree saved');
            });
        } else {
            this.professionService.saveLevel(this.professionName, this.level).then(() => {
                this.loading = false;
                // console.log('SAVED');
                this.toastr.success('Degree saved');
            });
        }
    }

    public saveItemAsGist() {
        this.loading = true;
        let params = {
            files: {}
        };
        let fileName = this.professionName + ' - ' + this.level.name + '.md';
        params.files[fileName] = {
            content: this.level.toMd()
        };

        this.githubService.makeGist(params, () => {
            this.loading = false;
            // console.log('Gist SAVED');
            this.toastr.success('Gist saved in Your profile');
        });
    }

    public onSelectTag($event:any) {
        this.level.items[this.currItemIndex].tags = [];
        $event.forEach(tagObj => {
            if (tagObj.id.length > 0) {
                this.level.items[this.currItemIndex].tags.push(tagObj.id);
            }
        });
    }

    public addToLevel(item:any, type:string) {
        var levelItem = new LevelItem();
        levelItem.parseFrom(item, type);
        this.level.items.push(levelItem);

        this.makeAllRequests();
        this.savedCourses = this.level.items.map((item:any)=> {
            return item.source;
        });
        this.youTubeResults = this.youtubeFilter(this.youTubeResults);
        this.courseraResults = this.courseraFilter(this.courseraResults);
        this.awesomeResults = this.awesomeFilter(this.awesomeResults);

        this.currItemIndex = this.level.items.length - 1;
    }
    
    public showResourceInfo(index: number) {
        this.currItemIndex = index;
    }

    public removeFromLevel(item:any) {
        var removed = remove(this.level.items, (levelItem) => {
            return levelItem.source === item.source;
        });

        this.savedCourses = this.level.items.map((item:any)=> {
            return item.source;
        });
        if(!this.level.items.length) this.savedCourses = [];

        this.makeAllRequests();
        this.currItemIndex = this.level.items.length - 1;
        console.log(' removeFromProfession(result:any)', removed);

    }

    public onLevelNameChanged(name:string) {
        if (!this.level.isNew) {
            this.level.isRenamed = true;
        }
        this.location.replaceState('/mentor/profession/' + this.professionName + '/content/' + name);
        this.level.name = name;
        // this.location
    }
}