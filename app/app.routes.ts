import {RouteDefinition} from '@angular/router-deprecated';
import {MentorProfessionsController} from "./mentor/controllers/professions.controller";
import {MentorProfessionEditController} from './mentor/controllers/profession-edit.controller';
import {MentorProfessionContentController} from './mentor/controllers/profession-content.controller';
import {MentorLoginController} from "./mentor/controllers/login.controller";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/mentor', name: 'MentorLogin', component: MentorLoginController },
    { path: '/mentor/professions', name: 'MentorProfessions', component: MentorProfessionsController },
    { path: '/mentor/profession/:name/edit', name: 'MentorProfessionEdit', component: MentorProfessionEditController },
    { path: '/mentor/profession/:name/content/:level', name: 'MentorProfessionContent', component: MentorProfessionContentController },
    { path: '/mentor/profession/create', name: 'MentorProfessionCreate', component: MentorProfessionEditController },
];
