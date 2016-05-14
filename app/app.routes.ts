import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from './home/home.component';
import {TodolistComponent} from './todolist/todolist.component';
import {SimplebindComponent} from './simplebind/simplebind.component';
import {ProfessionsController} from "./mentor/controllers/professions.controller";
import {ProfessionEditController} from './mentor/controllers/edit.controller';

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/simplebind', name: 'Simplebind', component: SimplebindComponent },
    { path: '/todolist', name: 'Todolist', component: TodolistComponent },
    { path: '/mentor/profession/:id/edit', name: 'ProfessionEdit', component: ProfessionEditController },
    { path: '/mentor/professions', name: 'Professions', component: ProfessionsController }
];
