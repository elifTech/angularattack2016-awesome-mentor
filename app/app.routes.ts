import {RouteDefinition} from '@angular/router-deprecated';
import {MentorProfessionsController} from "./mentor/controllers/professions.controller";
import {MentorProfessionEditController} from './mentor/controllers/profession-edit.controller';
import {MentorProfessionContentController} from './mentor/controllers/profession-content.controller';
import {MentorLoginController} from "./mentor/controllers/login.controller";
import {AboutController} from "./controllers/about.controller";
import {PublicSpecializationsController} from "./public/controllers/specializations.controller";
import {PublicDegreeController} from "./public/controllers/degree.controller";

export var APP_ROUTES:RouteDefinition[] = [
    {
        path: '/',
        name: 'PublicSpecializations',
        component: PublicSpecializationsController
    },
    {
        path: '/:profession/degree/:level',
        name: 'PublicDegree',
        component: PublicDegreeController
    },
    {
        path: '/login',
        name: 'MentorLogin',
        component: MentorLoginController
    },
    {
        path: '/mentor/professions', 
        name: 'MentorProfessions', 
        component: MentorProfessionsController,
        data: {
            permissions: ["github"]
        }
    },
    {
        path: '/mentor/profession/:name/content/:level',
        name: 'MentorProfessionContent',
        component: MentorProfessionContentController,
        data: {
            permissions: ["github"]
        }
    },
    {
        path: '/mentor/profession/create', 
        name: 'MentorProfessionCreate', 
        component: MentorProfessionEditController,
        data: {
            permissions: ["github"]
        }
    },
    {
        path: '/mentor/profession/:name',
        name: 'MentorProfessionEdit',
        component: MentorProfessionEditController,
        data: {
            permissions: ["github"]
        }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutController
    },
];
