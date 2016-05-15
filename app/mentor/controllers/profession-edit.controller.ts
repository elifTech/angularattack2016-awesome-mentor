import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgClass, NgIf} from '@angular/common';
import {FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {ROUTER_DIRECTIVES, CanActivate, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {Select, SELECT_DIRECTIVES} from 'ng2-select';

import {Profession} from '../../models/profession.model';
import {Level} from '../../models/level.model';
import {UserModel} from '../../models/user.model';
import {ProfessionService} from '../../services/profession.service';
import {AuthService} from '../../services/auth.service';
import {LoadingContainerComponent} from '../../components/loading-container.component';
import {ConfirmComponent} from '../../components/confirm.component';

@Component({
    templateUrl: 'views/mentor/profession-edit.html',
    directives: [
        FORM_DIRECTIVES,
        ROUTER_DIRECTIVES,
        Select,
        ConfirmComponent,
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

    public enableEdit:boolean;

    private tags:string[] = [''];

    public form: ControlGroup;
    
    private user: UserModel;

    constructor(private params:RouteParams, private professionService: ProfessionService,
                protected router:Router, private fb: FormBuilder, private authService:AuthService) {

        this.profession = new Profession({});

        this.profession.isNew = true;

        this.form = fb.group({
            name: ['', Validators.pattern('[A-Za-z0-9\-\_\\s]+')]
        });

        this.authService.init();
        AuthService.user$.subscribe(user => {
            this.user = user;
        });
    }

    ngOnInit() {
        this.enableEdit = true;
        if(this.params.get('name')) {
            this.loading = true;
            this.professionService
                .getByName(this.params.get('name'))
                .then((profession) => {
                    this.profession = profession;
                    this.enableEdit = false;
                    this.loading = false;
                });
        }
    }

    public saveItem() {
        this.loading = true;
        this.professionService.save(this.profession).then(() => {
            this.loading = false;
            console.log('SAVED');
        });
    }

    public removeLevel(index:number) {
        this.loading = true;
        this.professionService.removeLevel(this.profession.name, this.profession.levels[index].name).then(() => {
            this.loading = false;
            console.log('removed Level');
            this.profession.levels.splice(index, 1);
        });
    }

    public setTags($event) {
        this.profession.tags = [];
        $event.forEach(tagObj => {
            if(tagObj.id.length > 0) {
                this.profession.tags.push(tagObj.id);
            }
        });
    }

    public toggleEdit() {
        this.enableEdit = !this.enableEdit;
    }
}