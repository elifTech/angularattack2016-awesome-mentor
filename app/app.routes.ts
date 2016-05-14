import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from './home/home.component';
import {TodolistComponent} from './todolist/todolist.component';
import {SimplebindComponent} from './simplebind/simplebind.component';
import {ProfessionsComponent} from "./mentor/controllers/professions.controller";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/simplebind', name: 'Simplebind', component: SimplebindComponent },
    { path: '/todolist', name: 'Todolist', component: TodolistComponent },
    { path: '/mentor/professions', name: 'Professions', component: ProfessionsComponent }
];
