import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';
import {MODAL_DIRECTIVES} from 'ng2-bs3-modal/ng2-bs3-modal';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';

import {LoadingContainerComponent} from '../../components/loading-container.component';
import {CourseraService} from '../../services/coursera.service';
import {YouTubeService} from '../../services/youtube.service';
import {AwesomeService} from '../../services/awesome.service';

import {FORM_PROVIDERS, FormBuilder, Validators} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import {Level} from '../../models/level.model';
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
    public currItemIndex:number;
    public professionName:string = '';
    public profession:Profession;
    public queryString:string = '';
    public savedCourses:string[] = [];

    youTubeResults: any[];
    courseraResults: any[];
    awesomeResults: any[];
    public form: any;


    constructor(protected router:Router, private _courseraService: CourseraService,
                private _youTubeService: YouTubeService,
                private professionService: ProfessionService,
                private params: RouteParams,
                private _awesomeService: AwesomeService, private fb: FormBuilder) {


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
        this.level = new Level({
            name: decodeURIComponent(params.get('level'))
        });

        this.professionService
            .getLevelItems(this.professionName, this.level.name)
            .then((levelItems) => {
                console.log(levelItems);
                this.savedCourses = levelItems.map((item:any)=>{return item.source;});
                this.level.items = levelItems.map(function(item:any){return new LevelItem(item)});
            });

        this.professionService
            .getByName(this.professionName)
            .then((profession) => {
                this.profession = profession;
                console.log('this.profession', this.profession);
            });

    }

    // helpers start

    protected makeAllRequests() {
        this.searchYoutube();
        this.searchCoursera();
        this.searchAwesome();
    }

    // youtube
    protected searchYoutube() {
        if(this.queryString.length <= 1) return;
        this._youTubeService.search(this.queryString).then(res => {
            this.youTubeResults = this.youtubeFilter(res.json().items);
        });
    }

    protected searchCoursera() {
        if(this.queryString.length <= 1) return;
        this._courseraService.search(this.queryString).then(res => {
            this.courseraResults = this.courseraFilter(res);
        });
    }
    protected searchAwesome() {
        if(this.queryString.length <= 1) return;
        this._awesomeService.search(this.queryString).then(res => {
            this.awesomeResults = this.awesomeFilter(res);
        });
    }

    protected youtubeFilter(items) {
        return items.filter((result:any) => {return this.savedCourses.indexOf("https://www.youtube.com/watch?v=" + result.id.videoId) === -1;});
    }
    
    protected courseraFilter(items) {
        return items.filter((result:any) => {return this.savedCourses.indexOf('https://www.coursera.org/course/' + result.slug) === -1;});
    }    
    
    protected awesomeFilter(items) {
        return items.filter((result:any) => {return this.savedCourses.indexOf(result.href) === -1;});
    }
    // helpers end
    
    public saveItem()
    {
        this.professionService.saveLevel(this.professionName, this.level);
    }

    public onSelectTag($event:any)
    {
        this.level.items[this.currItemIndex].tags = [];
        $event.forEach(tagObj => {
            if(tagObj.id.length > 0) {
                this.level.items[this.currItemIndex].tags.push(tagObj.id);
            }
        });
    }

    public addToLevel(item:any, type:string)
    {
        var levelItem = new LevelItem();
        levelItem.parseFrom(item, type);
        this.level.items.push(levelItem);

        this.savedCourses = this.level.items.map((item:any)=>{return item.source;});
        this.youTubeResults = this.youtubeFilter(this.youTubeResults);
        this.courseraResults = this.courseraFilter(this.courseraResults);
        this.awesomeResults = this.awesomeFilter(this.awesomeResults);

        this.currItemIndex = this.level.items.length - 1;
    }

    public removeFromLevel(item:any)
    {
        var removed = remove(this.level.items, (levelItem) => {
            return levelItem.source === item.source;
        });
        this.makeAllRequests();

        console.log(this.level.items);

        console.log(' removeFromProfession(result:any)',  removed);

    }
}