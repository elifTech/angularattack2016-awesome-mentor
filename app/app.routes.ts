import {RouteDefinition} from '@angular/router-deprecated';
import {HomeComponent} from './home/home.component';
import {MentorProfessionsController} from "./mentor/controllers/professions.controller";
import {ProfessionEditController} from './mentor/controllers/edit.controller';
import {MentorLoginController} from "./mentor/controllers/login.controller";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/mentor', name: 'MentorLogin', component: MentorLoginController },
    { path: '/mentor/professions', name: 'MentorProfessions', component: MentorProfessionsController },
    { path: '/mentor/profession/:id/edit', name: 'ProfessionEdit', component: ProfessionEditController },
];
