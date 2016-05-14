import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from './home/home.component';
import {MentorProfessionsController} from "./mentor/controllers/professions.controller";
import {MentorProfessionEditController} from './mentor/controllers/profession-edit.controller';
import {MentorProfessionContentController} from './mentor/controllers/profession-content.controller';
import {MentorLoginController} from "./mentor/controllers/login.controller";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/mentor', name: 'MentorLogin', component: MentorLoginController },
    { path: '/mentor/professions', name: 'MentorProfessions', component: MentorProfessionsController },
    { path: '/mentor/profession/:id/edit', name: 'MentorProfessionEdit', component: MentorProfessionEditController },
    { path: '/mentor/profession/:id/content', name: 'MentorProfessionContent', component: MentorProfessionContentController },
    { path: '/mentor/profession/create', name: 'MentorProfessionCreate', component: MentorProfessionEditController },
];
