import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

import {CourseraService} from '../../services/coursera.service';
import {YouTubeService} from '../../services/youtube.service';
import {AwesomeService} from '../../services/awesome.service';

import {FORM_PROVIDERS, FormBuilder, Validators} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import {ProfessionService} from '../../services/profession.service';

import {groupBy} from 'lodash';

@Component({
    templateUrl: 'views/mentor/profession-content.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
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
export class MentorProfessionContentController {
    public level:any = {};
    public queryString:string = '';

    professionForm: any;
    youTubeResults$: Observable<any>;
    courseraResults$: Observable<any>;
    awesomeResults$: Observable<any>;


    constructor(protected router:Router, private _courseraService: CourseraService,
                private _youTubeService: YouTubeService, 
                private _formBuilder: FormBuilder,
                private professionService: ProfessionService,
                private params: RouteParams,
                private _awesomeService: AwesomeService) {
        console.log('MentorProfessionContentController');

        this.professionForm = this._formBuilder.group({
            'queryStringInput': ['', Validators.required]
        });

        this.youTubeResults$ = this.professionForm.controls.queryStringInput.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this._youTubeService.search(term));

        this.courseraResults$ = this.professionForm.controls.queryStringInput.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this._courseraService.search(term));

        this.awesomeResults$ = this.professionForm.controls.queryStringInput.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this._awesomeService.search(term));


        this.level = {
            title: params.get('name'),
            items: []
        };

        this.professionService
            .getLevelItems(params.get('name'), params.get('level'))
            .then((levelItems) => {
                this.level.items = groupBy(levelItems, function(item:any){return item.domain});
            });
    }
    
    public saveItem()
    {

    }

    public addToProfession(result:any, type:string)
    {
        console.log(' addToProfession',  result, type);
    }

    public removeFromProfession(result:any)
    {
console.log(' removeFromProfession(result:any)',  result);
    }
}