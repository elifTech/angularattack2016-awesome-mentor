import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from './home/home.component';
import {TodolistComponent} from './todolist/todolist.component';
import {SimplebindComponent} from './simplebind/simplebind.component';
import {MentorProfessionsController} from "./mentor/controllers/professions.controller";
import {MentorProfessionEditController} from './mentor/controllers/profession-edit.controller';
import {MentorLoginController} from "./mentor/controllers/login.controller";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/simplebind', name: 'Simplebind', component: SimplebindComponent },
    { path: '/todolist', name: 'Todolist', component: TodolistComponent },
    { path: '/mentor', name: 'MentorLogin', component: MentorLoginController },
    { path: '/mentor/professions', name: 'MentorProfessions', component: MentorProfessionsController },
    { path: '/mentor/profession/:id/edit', name: 'MentorProfessionEdit', component: MentorProfessionEditController },
    { path: '/mentor/profession/create', name: 'MentorProfessionCreate', component: MentorProfessionEditController },
];
